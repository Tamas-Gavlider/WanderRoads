from django.db import models
from django.contrib.auth.models import User


class TravelBuddy(models.Model):
    """
    TravelBuddy model to represent a friendship-like relationship between users.
    A relationship is mutual if two records exist:
    - User A marks User B as a travel buddy.
    - User B also marks User A as a travel buddy.
    """
    
    owner = models.ForeignKey(
        User, related_name='travel_buddies_initiated', on_delete=models.CASCADE
    )
    travel_buddy = models.ForeignKey(
        User, related_name='travel_buddies_received', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['owner', 'travel_buddy']  # Prevent duplicates
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.owner.username} -> {self.travel_buddy.username}'

    def clean(self):
        """
        Prevent a user from marking themselves as their own travel buddy.
        """
        if self.owner == self.travel_buddy:
            raise ValidationError("Owner and Travel Buddy cannot be the same user.")

    @staticmethod
    def is_mutual(owner, travel_buddy):
        """
        Check if a mutual TravelBuddy relationship exists.
        """
        return TravelBuddy.objects.filter(
            owner=owner, travel_buddy=travel_buddy
        ).exists() and TravelBuddy.objects.filter(
            owner=travel_buddy, travel_buddy=owner
        ).exists()