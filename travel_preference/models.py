from django.db import models
from django.contrib.auth.models import User
from django_countries.fields import CountryField

# Create your models here.

CONTINENTS = [
    ("ANY", "Any Continent"), 
    ("AF", "Africa"),
    ("NA", "North America"),
    ("OC", "Oceania"),
    ("AN", "Antarctica"),
    ("AS", "Asia"),
    ("EU", "Europe"),
    ("SA", "South America"),
]

CLIMATE_CHOICES = [
        ("ANY", "Any"),
        ("HOT", "Hot"),
        ("COLD", "Cold"),
        ("TROPICAL", "Tropical"),
        ("MILD", "Mild"),
    ]

ACTIVITY_CHOICES = [
        ("ANY", "Any"),
        ("CULTURE", "Culture & History"),
        ("NATURE", "Nature & Wildlife"),
        ("BEACH", "Beaches & Islands"),
        ("ADVENTURE", "Adventure & Hiking"),
        ("CITY", "City & Nightlife"),
        ("FOOD", "Food & Culinary"),
    ]

BUDGET_CHOICES = [
        ("ANY", "Any"),
        ("LOW", "Budget-Friendly"),
        ("MEDIUM", "Mid-Range"),
        ("HIGH", "Luxury"),
    ]

TRAVEL_STYLE_CHOICES = [
        ("ANY", "Any"),
        ("SOLO", "Solo Travel"),
        ("FAMILY", "Family"),
        ("BACKPACKING", "Backpacking"),
        ("LUXURY", "Luxury Travel"),
    ]

DURATION_CHOICES = [
        ("ANY", "Any"),
        ("WEEKEND", "Weekend"),
        ("ONE_WEEK", "1 Week"),
        ("TWO_WEEKS", "2 Weeks"),
        ("MONTH", "1 Month"),
    ]

class TravelPreference(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    preferred_continents = models.CharField(max_length=55, choices=CONTINENTS, default='ANY')
    preferred_countries = CountryField(max_length=55,default='Any Country')
    climate = models.CharField(max_length=50, choices=CLIMATE_CHOICES, default='ANY')
    activity = models.CharField(max_length=255, choices=ACTIVITY_CHOICES, default='ANY')
    budget = models.CharField(max_length=55, choices=BUDGET_CHOICES, default='ANY')
    travel_style = models.CharField(max_length=55, choices=TRAVEL_STYLE_CHOICES,default="ANY") 
    duration = models.CharField(max_length=55, choices=DURATION_CHOICES,default="ANY")
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return f'{self.owner}s preferences'
