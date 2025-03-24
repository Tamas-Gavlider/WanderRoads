from django.db import models
from django_countries.fields import CountryField
from django.contrib.auth.models import User

# Create your models here.


class Trip(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    destination = CountryField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    notes = models.TextField(max_length=255, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.owner}'s upcoming trip to {self.destination}"
