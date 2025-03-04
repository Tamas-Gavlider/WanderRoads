from rest_framework import serializers
from django.db import IntegrityError
from .models import TravelBuddy

class TravelBuddySerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    buddy_name = serializers.ReadOnlyField(source='travel_buddy.username')

    class Meta:
        model = TravelBuddy
        fields = ['id', 'owner', 'created_at', 'travel_buddy', 'buddy_name']

    def create(self, validated_data):
        # Check if the travel buddy relationship exists in the reverse direction
        owner = validated_data['owner']
        travel_buddy = validated_data['travel_buddy']
        
        # Check for mutual relationship
        if TravelBuddy.objects.filter(owner=travel_buddy, travel_buddy=owner).exists():
            raise serializers.ValidationError({'detail': 'This travel buddy relationship already exists from the other side.'})

        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({'detail': 'Possible duplicate relationship.'})
