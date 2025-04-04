from django.test import TestCase
from django.contrib.auth.models import User
from .models import TravelPreference


# Create your tests here.

class TravelPreferenceTests(TestCase):

    def setUp(self):
        """Create a user for testing."""
        self.user = User.objects.create_user(username='testuser',
                                             password='password123')

        self.preference = TravelPreference.objects.create(owner=self.user)

    def test_create_travel_preference(self):
        retrieved_preference = TravelPreference.objects.get(owner=self.user)
        self.assertEqual(retrieved_preference.climate, "ANY")
        self.assertEqual(retrieved_preference.preferred_continent, "ANY")
        self.assertEqual(retrieved_preference.activity, "ANY")
        self.assertEqual(retrieved_preference.budget, "ANY")
        self.assertEqual(retrieved_preference.travel_style, "ANY")
        self.assertEqual(retrieved_preference.duration, "ANY")

    def test_update_travel_preference(self):
        self.preference.climate = "COLD"
        self.preference.budget = "LUXURY"
        self.preference.preferred_continent = "EU"
        self.preference.save()
        updated_preference = TravelPreference.objects.get(owner=self.user)
        self.assertEqual(updated_preference.climate, "COLD")
        self.assertEqual(updated_preference.preferred_continent, "EU")
        self.assertEqual(updated_preference.budget, "LUXURY")
