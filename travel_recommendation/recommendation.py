import pandas as pd
from django.contrib.auth.models import User
from .models import TravelRecommendation


def generate_recommendation(user: User):
    """
    Generate a travel destination recommendation using Pandas
    based on the user's travel preferences and save it.
    """
    try:
        from travel_preference.models import TravelPreference
        user_preference = TravelPreference.objects.get(owner=user)
    except TravelPreference.DoesNotExist:
        return

    # Mapping of continent codes to full names
    CONTINENT_MAP = {
        "AF": "africa",
        "AS": "asia",
        "EU": "europe",
        "NA": "north america",
        "SA": "south america",
        "OC": "oceania",
        "AN": "antarctica",
        "ANY": "any",
    }

    """
    Convert continent code to full name - Always uppercase before mapping)
    """
    user_continent = CONTINENT_MAP.get(
        user_preference.preferred_continent.upper(), "any").lower()

    preferences = {
        "continent": user_continent,
        "climate": user_preference.climate.lower(),
        "activity": user_preference.activity.lower(),
        "budget": user_preference.budget.lower(),
        "travel_style": user_preference.travel_style.lower(),
        "duration": user_preference.duration.lower(),
    }

    # Load travel recommendation dataset from the csv file
    df = pd.read_csv('./travel_recommendation/travel_recommendations_data.csv',
                     header=0)

    # Normalize column names and values
    df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")
    df = df.map(lambda x: x.strip().lower() if isinstance(x, str) else x)

    # Filter dataset by continent preference
    if preferences["continent"] != "any":
        df = df[df["continent"] == preferences["continent"]]

    # Match count logic
    match_count = df.apply(lambda row: sum(
        # Match "any" with any value
        (preferences[key] == "any" or preferences[key] == row[key])
        for key in preferences.keys()
    ), axis=1)

    # Rank destinations perfect match where at least 5 preferences match
    perfect_match = df.loc[match_count >= 5]
    best_match = df.loc[(match_count >= 4)]  # At least 4 preferences match

    # Select destinations (remove duplicates)
    primary_destination = (
     perfect_match["destination"].iloc[0] if not perfect_match.empty else None)
    additional_destinations = best_match["destination"].head(5).tolist()

    # Remove duplicates and filter out None values
    unique_destinations = list(set(filter(None, [primary_destination]
                                          + additional_destinations)))

    # Return the destinations as a List
    if primary_destination:
        recommended_destinations = ([primary_destination] +
        [d for d in unique_destinations if d != primary_destination])
    else:
        # If no perfect match, return alternatives
        recommended_destinations = unique_destinations

    if len(recommended_destinations) == 0:
        # Message if there are no recommendations for the given preferences
        recommended_destinations = ["No recommended destinations for the given"
                                    " preferences."]
    # Save the recommendation as a JSON list
    travel_recommendation, _ = TravelRecommendation.objects.get_or_create(
        owner=user)
    # Store as a list
    travel_recommendation.recommended_destination = recommended_destinations
    travel_recommendation.save()

    return recommended_destinations
