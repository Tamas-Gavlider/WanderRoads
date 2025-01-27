from rest_framework import serializers
from django_countries.serializer_fields import CountryField
from datetime import datetime
from trip.models import Trip


class TripSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    destination = CountryField()
    days_until_trip = serializers.SerializerMethodField()
    
    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner
    
    def get_days_until_trip(self, obj):
        today = datetime.today().date()
        days_left = (obj.start_date - today).days
        return days_left
    
    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)
    
    def to_representation(self, instance):
        # Get the default representation from the ModelSerializer
        representation = super().to_representation(instance)
        
        # Replace the destination field with the country name instead of code
        representation['destination'] = instance.get_destination_display()  # Convert code to name
        
        return representation
    
    class Meta:
        model = Trip
        fields = [
            'id', 'owner', 'is_owner', 'profile_id',
            'created_at', 'updated_at','destination',
            'start_date', 'end_date', 'notes', 'days_until_trip'
        ]