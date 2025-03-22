from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User 
from cloudinary.models import CloudinaryField
from django_countries.fields import CountryField

# Create your models here.

EXPERIENCE_LEVEL = [
    ('Wanderer','Wanderer'),
    ('Pathfinder','Pathfinder'),
    ('Explorer','Explorer'),
    ('Cultural Ambassador','Cultural Ambassador'),
    ('World Voyager','World Voyager'),
    ('Global Legend','Global Legend')    
]

class Profile(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    image = CloudinaryField('image', default='profile_ozflyd')
    theme_song = CloudinaryField('audio',
    resource_type='raw', 
    allowed_formats=['mp3'], default='travel-audio-oficial-243586_eehcqv')
    experience = models.CharField(max_length=55, choices=EXPERIENCE_LEVEL, default='Wanderer')
    visited_countries = CountryField(multiple=True, blank=True)
    status = models.TextField(max_length=255, blank=True)

    def update_experience_level(self):
        # update the experience level based on the number of visited countries
        num_countries = len(self.visited_countries)

        if num_countries >= 50:
            self.experience = 'Global Legend'
        elif num_countries >= 40:
            self.experience = 'World Voyager'
        elif num_countries >= 30:
            self.experience = 'Cultural Ambassador'
        elif num_countries >= 20:
            self.experience = 'Explorer'
        elif num_countries >= 10:
            self.experience = 'Pathfinder'
        else:
            self.experience = 'Wanderer'

    def save(self, *args, **kwargs):
        """Override save method to update experience level before saving."""
        self.update_experience_level()
        super().save(*args, **kwargs)
    
    def set_visited_countries(self, countries):
        # Ensure countries are stored as a set (no duplicates)
        self.visited_countries = list(set(countries))

    def add_visited_country(self, country):
        # Add a country to the set (if not already in it)
        countries = set(self.visited_countries)
        countries.add(country)
        self.visited_countries = list(countries)

    def remove_visited_country(self, country):
        # Remove a country from the set
        countries = set(self.visited_countries)
        countries.discard(country)
        self.visited_countries = list(countries)
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.owner}'s profile"
    
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(owner=instance)

post_save.connect(create_profile, sender=User)