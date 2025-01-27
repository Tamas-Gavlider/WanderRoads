from django.db.models import Q
from rest_framework import serializers
from .models import TravelBuddy

class TravelBuddySerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username') 
    buddy_name = serializers.ReadOnlyField(source='travel_buddy.username')  
    is_fully_confirmed = serializers.SerializerMethodField()  

    class Meta:
        model = TravelBuddy
        fields = [
            'id', 'owner', 'requested_at', 'travel_buddy',
            'buddy_name', 'status', 'is_fully_confirmed', 'confirmed_at'
        ]

    def get_is_fully_confirmed(self, obj):
        """Check if the travel buddy relationship is fully confirmed."""
        return obj.status == 'confirmed'

    def create(self, validated_data):
        owner = validated_data['owner']
        travel_buddy = validated_data['travel_buddy']

        if owner == travel_buddy:
            raise serializers.ValidationError("You cannot add yourself as a travel buddy.")

        # Check for an existing relationship in either direction
        if TravelBuddy.objects.filter(
            Q(owner=owner, travel_buddy=travel_buddy) |
            Q(owner=travel_buddy, travel_buddy=owner)
        ).exists():
            raise serializers.ValidationError("This travel buddy relationship already exists.")

        return super().create(validated_data)