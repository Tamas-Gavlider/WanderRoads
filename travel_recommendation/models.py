from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class TravelRecommendation(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    recommended_destination = models.JSONField(default=list)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Recommended destination for {self.owner} :"
        f"{self.recommended_destination}"
