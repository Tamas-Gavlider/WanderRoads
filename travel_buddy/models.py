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
    confirmed_by_buddy = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['owner', 'travel_buddy']

    def __str__(self):
        return f'{self.owner.username} and {self.travel_buddy.username} - Confirmed: {self.confirmed}'

    def confirm_travel(self, user):
        """
        Confirm travel based on the user making the request.
        """
        if user == self.owner:
            self.confirmed = True
        elif user == self.travel_buddy:
            self.confirmed_by_buddy = True

        # Update confirmation status when both parties agree
        if self.confirmed and self.confirmed_by_buddy:
            self.save()
            return True  
        self.save()
        return False

   