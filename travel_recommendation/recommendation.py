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
        return  # Exit if the user has no preferences
    
    # Mapping of continent codes to full names
    CONTINENT_MAP = {
        "AF": "africa",
        "AS": "asia",
        "EU": "europe",
        "NA": "north america",
        "SA": "south america",
        "OC": "oceania",
        "AN": "antarctica",
        "ANY": "any",  # Ensure "ANY" is correctly mapped
    }

    # Convert continent code to full name (Fix: Always uppercase before mapping)
    user_continent = CONTINENT_MAP.get(user_preference.preferred_continent.upper(), "any").lower()

    preferences = {
        "continent": user_continent,  # Now properly mapped!
        "climate": user_preference.climate.lower(),
        "activity": user_preference.activity.lower(),
        "budget": user_preference.budget.lower(),
        "travel_style": user_preference.travel_style.lower(),
        "duration": user_preference.duration.lower(),
    }

    # **Load travel recommendation dataset**
    df = pd.read_csv('./travel_recommendation/travel_recommendations_data.csv', header=0)

    # **Normalize column names and values**
    df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")
    df = df.map(lambda x: x.strip().lower() if isinstance(x, str) else x)

    # **Step 1: Filter dataset by continent preference**
    if preferences["continent"] != "any":
        df = df[df["continent"] == preferences["continent"]]

    # **Step 2: Match count logic**
    match_count = df.apply(lambda row: sum(
        (preferences[key] == "any" or preferences[key] == row[key])  # Match "any" with any value
        for key in preferences.keys()
    ), axis=1)

    # **Step 3: Rank destinations**
    perfect_match = df.loc[match_count >= 5]
    best_match = df.loc[(match_count >= 4)]  # Second-best matches

    # **Step 4: Select destinations (remove duplicates)**
    primary_destination = perfect_match["destination"].iloc[0] if not perfect_match.empty else None
    additional_destinations = best_match["destination"].head(5).tolist()

    # Remove duplicates and filter out None values
    unique_destinations = list(set(filter(None, [primary_destination] + additional_destinations)))

    # **Step 5: Return as a List**
    if primary_destination:
        recommended_destinations = [primary_destination] + [d for d in unique_destinations if d != primary_destination]
    else:
        recommended_destinations = unique_destinations  # If no perfect match, return alternatives

    # **Step 6: Save the recommendation as a JSON list**
    travel_recommendation, _ = TravelRecommendation.objects.get_or_create(owner=user)
    travel_recommendation.recommended_destination = recommended_destinations  # Store as a list
    travel_recommendation.save()
    
    return recommended_destinations