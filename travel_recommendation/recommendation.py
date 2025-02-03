import numpy as np
import tensorflow as tf
import tensorflow_datasets as tfds
import tensorflow_recommenders as tfrs
import pandas as pd
from travel_preference.models import TravelPreference
from django.contrib.auth.models import User


def generate_recommendation(user: User):
    """
    Generate a travel destination recommendation using TensorFlow
    based on the user's travel preferences.
    """
    # Load travel recommendation dataset
    df = pd.read_csv('travel_recommendations_data.csv')

    # Convert to TensorFlow dataset
    recommendation = tf.data.Dataset.from_tensor_slices(dict(df))

    # Get user's travel preferences
    try:
        preferences = TravelPreference.objects.get(owner=user)
    except TravelPreference.DoesNotExist:
        return "No preferences found for this user."

    preferred_continent = preferences.preferred_continent
    climate = preferences.climate
    activity = preferences.activity
    budget = preferences.budget
    travel_style = preferences.travel_style
    duration = preferences.duration

    # Filter dataset based on user preferences
    filtered_df = df[
        ((df["continent"] == preferred_continent) | (preferred_continent == "ANY")) &
        ((df["climate"] == climate) | (climate == "ANY")) &
        ((df["activity"] == activity) | (activity == "ANY")) &
        ((df["budget"] == budget) | (budget == "ANY")) &
        ((df["travel_style"] == travel_style) | (travel_style == "ANY")) &
        ((df["duration"] == duration) | (duration == "ANY"))
    ]

    # Check if there are any matching recommendations
    if filtered_df.empty:
        return "No recommendations found matching your preferences."

    # Convert filtered data to TensorFlow dataset
    filtered_recommendation = tf.data.Dataset.from_tensor_slices(filtered_df["recommended_destination"])

    # Define vocabulary lookup layer
    recommended_destination_vocabulary = tf.keras.layers.StringLookup(mask_token=None)
    recommended_destination_vocabulary.adapt(filtered_df["recommended_destination"])

    # Define recommendation model
    recommendation_model = tf.keras.Sequential([
        recommended_destination_vocabulary,
        tf.keras.layers.Embedding(recommended_destination_vocabulary.vocab_size(), 64)
    ])

    # Define retrieval task
    task = tfrs.tasks.Retrieval(metrics=tfrs.metrics.FactorizedTopK(
        filtered_recommendation.batch(128).map(recommendation_model)
    ))

    # Define Recommendation Model
    class RecommendationModel(tfrs.Model):
        def __init__(self, recommendation_model: tf.keras.Model, task: tfrs.tasks.Retrieval):
            super().__init__()
            self.recommendation_model = recommendation_model
            self.task = task

        def compute_loss(self, features: Dict[Text, tf.Tensor], training=False) -> tf.Tensor:
            recommendation_embeddings = self.recommendation_model(features["recommended_destination"])
            return self.task(recommendation_embeddings)

    # Create a retrieval model
    model = RecommendationModel(recommendation_model, task)
    model.compile(optimizer=tf.keras.optimizers.Adagrad(0.5))

    # Train the model
    model.fit(filtered_recommendation.batch(4096), epochs=3)

    # Create brute-force retrieval index
    index = tfrs.layers.factorized_top_k.BruteForce(model.recommendation_model)
    index.index_from_dataset(tf.data.Dataset.from_tensor_slices(filtered_df["recommended_destination"]).batch(100))

    # Get recommendations for a sample query
    _, recommended_titles = index(tf.constant(["some_destination"]))

    return f"Top 3 recommendations: {recommended_titles[0, :3]}"
