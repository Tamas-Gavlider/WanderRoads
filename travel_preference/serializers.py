from rest_framework import serializers
from .models import TravelPreference


class TravelPreferenceSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
  
    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner
    
    def to_representation(self, instance):
        # Get the default representation from the ModelSerializer
        representation = super().to_representation(instance)

        # Replace the continent field with the continent name
        representation['preferred_continent'] = instance.get_preferred_continent_display()
        return representation

    class Meta:
        model = TravelPreference
        fields = [
            'id',
            'owner',
            'created_at',
            'updated_at',
            'preferred_continent',
            'climate',
            'activity',
            'budget',
            'travel_style',
            'duration'
        ]