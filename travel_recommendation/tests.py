from django.test import TestCase
from django.contrib.auth.models import User
from travel_preference.models import TravelPreference
from .models import TravelRecommendation
from .recommendation import generate_recommendation


# Create your tests here.

class TravelRecommendationTests(TestCase):

    def setUp(self):
        """Create a user for testing."""
        self.user = User.objects.create_user(username='testuser',
                                             password='password123')

        self.preference = TravelPreference.objects.create(owner=self.user)
        self.recommendation = TravelRecommendation.objects.get(owner=self.user)

    def test_generate_first_recommendation(self):
        recommended_destination = self.recommendation.recommended_destination
        self.assertEqual(len(recommended_destination), 5)

    def test_recommendaiton_with_no_match(self):
        self.preference.preferred_continent = 'AN'
        self.preference.save()
        self.recommendation.refresh_from_db()
        recommended_destination = self.recommendation.recommended_destination
        self.assertEqual(recommended_destination,
                         ["No recommended destinations"
                          " for the given preferences."])

    def test_recommendaiton_only_one_match(self):
        self.preference.preferred_continent = 'SA'
        self.preference.climate = 'HOT'
        self.preference.activity = 'NATURE'
        self.preference.budget = 'HIGH'
        self.preference.duration = 'MONTH'
        self.preference.save()
        self.recommendation.refresh_from_db()
        recommended_destination = self.recommendation.recommended_destination
        self.assertEqual(len(recommended_destination), 1)
        self.assertEqual(recommended_destination[0], 'amazon rainforest')

    def test_new_recommendation_generated(self):
        """
        Testing whether the destination array length changes after the
        preferences are updated.
        """
        self.preference.preferred_continent = 'SA'
        self.preference.climate = 'HOT'
        self.preference.activity = 'NATURE'
        self.preference.budget = 'HIGH'
        self.preference.duration = 'MONTH'
        self.preference.save()
        self.recommendation.refresh_from_db()
        recommended_destination = self.recommendation.recommended_destination
        self.assertEqual(len(recommended_destination), 1)
        self.preference.preferred_continent = 'ANY'
        self.preference.save()
        self.recommendation.refresh_from_db()
        updated_destination = self.recommendation.recommended_destination
        self.assertEqual(len(updated_destination), 6)
