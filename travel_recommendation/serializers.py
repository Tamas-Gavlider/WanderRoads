from rest_framework import serializers
from .models import TravelRecommendation

class TravelRecommendationSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    recommended_destination = serializers.ReadOnlyField()

    class Meta:
        model = TravelRecommendation
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'recommended_destination',
        ]

