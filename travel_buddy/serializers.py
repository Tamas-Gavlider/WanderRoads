from django.db import IntegrityError
from rest_framework import serializers
from .models import TravelBuddy

class TravelBuddySerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    buddy_name = serializers.ReadOnlyField(source='travel_buddy.username')
    is_fully_confirmed = serializers.SerializerMethodField()

    class Meta:
        model = TravelBuddy
        fields = [
            'id', 'owner', 'created_at', 'travel_buddy', 
            'buddy_name', 'confirmed', 'confirmed_by_buddy', 'is_fully_confirmed'
        ]

    def get_is_fully_confirmed(self, obj):
        return obj.confirmed and obj.confirmed_by_buddy