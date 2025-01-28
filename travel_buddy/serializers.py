from rest_framework import serializers
from django.db.models import Q
from .models import TravelBuddy

class TravelBuddySerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    buddy_name = serializers.ReadOnlyField(source='travel_buddy.username')
    is_mutual = serializers.SerializerMethodField()

    class Meta:
        model = TravelBuddy
        fields = [
            'id', 'owner', 'created_at', 'travel_buddy',
            'buddy_name', 'is_mutual'
        ]

    def get_is_mutual(self, obj):
        """
        Check if the travel buddy relationship is mutual (i.e., both users added each other).
        """
        return TravelBuddy.is_mutual(obj.owner, obj.travel_buddy)

    def create(self, validated_data):
        owner = validated_data['owner']
        travel_buddy = validated_data['travel_buddy']

        if owner == travel_buddy:
            raise serializers.ValidationError("You cannot add yourself as a travel buddy.")

        # Ensure the relationship is not already in either direction
        if TravelBuddy.objects.filter(
            Q(owner=owner, travel_buddy=travel_buddy) |
            Q(owner=travel_buddy, travel_buddy=owner)
        ).exists():
            raise serializers.ValidationError("This travel buddy relationship already exists.")

        # Create the travel buddy relationship in both directions
        travel_buddy_entry_1 = TravelBuddy.objects.create(owner=owner, travel_buddy=travel_buddy)
        travel_buddy_entry_2 = TravelBuddy.objects.create(owner=travel_buddy, travel_buddy=owner)

        return travel_buddy_entry_1  # Return the first entry (or whichever you prefer)