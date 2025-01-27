from django.db import models
from django.contrib.auth.models import User


class TravelBuddy(models.Model):
    """
    TravelBuddy model to represent a friendship-like relationship between users
    who confirm they traveled together.
    'owner' is a User who adds another User as a travel buddy.
    'travel_buddy' is the User marked as a travel buddy by the owner.
    """
    owner = models.ForeignKey(
        User, related_name='travel_buddy_owner', on_delete=models.CASCADE
    )
    travel_buddy = models.ForeignKey(
        User, related_name='travel_buddy_partners', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    confirmed = models.BooleanField(default=False)  

    class Meta:
        ordering = ['-created_at']
        unique_together = ['owner', 'travel_buddy']

    def __str__(self):
        return f'{self.owner.username} and {self.travel_buddy.username} - Confirmed: {self.confirmed}'

    def confirm_travel(self):
        """
        Method to confirm that the two users have traveled together.
        """
        self.confirmed = True
        self.save()

   