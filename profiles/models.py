from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User 
from cloudinary.models import CloudinaryField
from countries.models import Country

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
    name = models.CharField(max_length=255, blank=True)
    image = CloudinaryField('image', default='pexels-nurseryart-346885_nj7aji')
    theme_song = CloudinaryField('audio',resource_type= 'video', default='travel-audio-oficial-243586_eehcqv')
    experience = models.CharField(max_length=55, choices=EXPERIENCE_LEVEL)
    visited_countries = models.ManyToManyField(Country, blank=True)
    status = models.TextField(max_length=255, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.owner}'s profile"
    
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(owner=instance)

post_save.connect(create_profile, sender=User)