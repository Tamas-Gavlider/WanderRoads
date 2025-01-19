from django.db.models.signals import post_save
from cloudinary.models import CloudinaryField
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255)
    image = CloudinaryField("image", blank=True, default='https://res.cloudinary.com/dfi7tw6ox/image/upload/v1734696462/samples/ecommerce/accessories-bag.jpg', null=True, help_text="Profile picture")
    theme_song = CloudinaryField("audio", resource_type="video", blank=True, null=True, help_text="User's theme song")
    experience = models.TextField(blank=True, help_text="User's experience description")
    visited_countries = models.TextField(blank=True, help_text="List of visited countries")
    status = models.TextField(blank=True, help_text="User's status or bio")

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.owner}'s profile"
    
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(owner=instance)
    
post_save.connect(create_profile, sender=User)