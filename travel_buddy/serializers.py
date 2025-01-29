from rest_framework import serializers
from django.db import IntegrityError
from .models import TravelBuddy

class TravelBuddySerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    buddy_name = serializers.ReadOnlyField(source='travel_buddy.username')

    class Meta:
        model = TravelBuddy
        fields = [
            'id', 'owner', 'created_at', 'travel_buddy',
            'buddy_name',
        ]

    def get_is_mutual(self, obj):
        """
        Check if the travel buddy relationship is mutual (i.e., both users added each other).
        """
        return TravelBuddy.is_mutual(obj.owner, obj.travel_buddy)

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({'detail': 'possible duplicate'})