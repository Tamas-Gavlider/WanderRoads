import pandas as pd
import numpy as np
from django.contrib.auth.models import User


def generate_recommendation(user: User):
    """
    Generate a travel destination recommendation using TensorFlow
    based on the user's travel preferences.
    """
    from travel_preference.models import TravelPreference 
    user_preference = TravelPreference.objects.get(owner=user)
        
    # Convert the user's preferences into a Pandas Series
       
    preferences = pd.Series([
            user_preference.preferred_continent,
            user_preference.climate,
            user_preference.activity,
            user_preference.budget,
            user_preference.travel_style,
            user_preference.duration
        ], index=["continent", "climate", "activity", "budget", "travel_style", "duration"])
    # Load travel recommendation dataset
    df = pd.read_csv('./travel_recommendation/travel_recommendations_data.csv', header=0)
    # Normalize column names (convert to lowercase and remove spaces)
    df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")  # Replace spaces with underscores

    # Normalize case for values
    df = df.map(lambda x: x.strip().lower() if isinstance(x, str) else x)
    preferences = preferences.str.lower()

    print("Fixed DataFrame Columns:", df.columns)  # Debugging

    # Now comparison should work
    match_count = df.apply(lambda row: sum(row.iloc[:-1] == preferences), axis=1)

    perfect_match = df.loc[match_count >= 5]
    best_match = df.loc[(match_count >= 4) & (match_count < 5)]

    # Convert to lists of destinations
    best_match_destinations = best_match["destination"].tolist()
    perfect_match_destinations = perfect_match["destination"].tolist()

    # Return them separately as a dictionary (or a tuple if you prefer)
    return {
        "best_match": best_match_destinations,
        "perfect_match": perfect_match_destinations}


    
   