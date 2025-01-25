from django.db import models
from django_countries.fields import CountryField

# Create your models here.

class Country(models.Model):
    name = models.CharField(max_length=100, unique=True)  

    def __str__(self):
        return self.name