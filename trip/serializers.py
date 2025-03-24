from rest_framework import serializers
from django_countries.serializer_fields import CountryField
from datetime import date, datetime
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
        """
        Countdown till the upcoming trip
        """
        today = datetime.today().date()
        days_left = (obj.start_date - today).days
        return days_left

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)

    def to_representation(self, instance):
        """
        Get the default representation from the ModelSerializer
        """
        representation = super().to_representation(instance)
        # Replace the destination field with the country name instead of code
        representation['destination'] =
        instance.get_destination_display()

        return representation

    def validate(self, data):
        """
        Custom validation to ensure:
        - `start_date` is not in the past.
        - `end_date` is not before `start_date`.
        """
        start_date = data.get("start_date")
        end_date = data.get("end_date")
        today = date.today()

        if start_date and start_date < today:
            raise serializers.ValidationError(
                {"start_date": "The start date cannot be in the past."})

        if start_date and end_date and end_date < start_date:
            raise serializers.ValidationError(
                {"end_date": "The end date cannot be before the start date."})

        return data

    class Meta:
        model = Trip
        fields = [
            'id', 'owner', 'is_owner', 'profile_id',
            'created_at', 'updated_at', 'destination',
            'start_date', 'end_date', 'notes', 'days_until_trip'
        ]
