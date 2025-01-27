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
            'buddy_name', 'buddy', 'is_fully_confirmed'
        ]

    def get_is_fully_confirmed(self, obj):
        return obj.buddy

    def create(self, validated_data):
        owner = validated_data['owner']
        travel_buddy = validated_data['travel_buddy']

        # Check if the relationship already exists
        if TravelBuddy.objects.filter(owner=owner, travel_buddy=travel_buddy).exists():
            raise serializers.ValidationError("This travel buddy relationship already exists.")
        
        return super().create(validated_data)