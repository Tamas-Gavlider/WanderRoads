from django.test import TestCase
from django.contrib.auth.models import User
from .models import Profile
from django_countries.fields import Country


class ProfileTests(TestCase):

    def setUp(self):
        """Create a user for testing."""
        self.user = User.objects.create_user(username='testuser',
                                             password='password123')

    def test_create_profile(self):
        """Test that a profile is created when a user is created."""
        user = User.objects.create_user(username='newuser',
                                        password='password123')
        profile = Profile.objects.get(owner=user)
        self.assertEqual(profile.owner.username, 'newuser')
        self.assertEqual(profile.experience, 'Wanderer')

    def test_update_experience_level(self):
        """
        Test that experience level updates based on visited countries.
        """
        profile = Profile.objects.get(owner=self.user)
        profile.set_visited_countries([])
        profile.save()
        self.assertEqual(profile.experience, 'Wanderer')
        # Test with 15 countries visited
        countries = ['US', 'CA', 'FR', 'DE', 'IT', 'ES', 'JP', 'AU',
                     'BR', 'IN', 'MX', 'CN', 'ZA', 'GB', 'RU']
        profile.set_visited_countries(countries)
        profile.save()
        self.assertEqual(profile.experience, 'Pathfinder')

    def test_add_visited_country(self):
        """Test adding a visited country."""
        profile = Profile.objects.get(owner=self.user)
        initial_count = len(profile.visited_countries)

        profile.add_visited_country('US')
        profile.save()

        self.assertIn('US', profile.visited_countries)
        self.assertEqual(len(profile.visited_countries), initial_count + 1)

    def test_remove_visited_country(self):
        """Test removing a visited country."""
        profile = Profile.objects.get(owner=self.user)
        profile.add_visited_country('US')
        profile.save()

        initial_count = len(profile.visited_countries)
        profile.remove_visited_country('US')
        profile.save()

        self.assertNotIn('US', profile.visited_countries)
        self.assertEqual(len(profile.visited_countries), initial_count - 1)
