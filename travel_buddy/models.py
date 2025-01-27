from django.db import models
from django.contrib.auth.models import User


class TravelBuddy(models.Model):
    """
    TravelBuddy model to represent a friendship-like relationship between users
    who confirm they traveled together.
    'owner' is a User who adds another User as a travel buddy.
    'travel_buddy' is the User marked as a travel buddy by the owner.
    """
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('rejected', 'Rejected'),
    ]
    
    owner = models.ForeignKey(
        User, related_name='travel_buddy_owner', on_delete=models.CASCADE
    )
    travel_buddy = models.ForeignKey(
        User, related_name='travel_buddy_partners', on_delete=models.CASCADE
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    requested_at = models.DateTimeField(auto_now_add=True)
    confirmed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-requested_at']
        unique_together = ['owner', 'travel_buddy']
        
    def __str__(self):
        return f'{self.owner.username} -> {self.travel_buddy.username} - Status: {self.status}'

    def clean(self):
        if self.owner == self.travel_buddy:
            raise ValidationError("Owner and Travel Buddy cannot be the same user.")
        
    def confirm(self):
        """Confirm the buddy request."""
        self.status = 'confirmed'
        self.confirmed_at = timezone.now()
        self.save()

    def reject(self):
        """Reject the buddy request."""
        self.status = 'rejected'
        self.save()