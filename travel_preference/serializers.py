from rest_framework import serializers
from .models import TravelPreference

class TravelPreferenceSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    preferred_continent_choices = serializers.SerializerMethodField()
    climate_choices = serializers.SerializerMethodField()
    activity_choices = serializers.SerializerMethodField()
    budget_choices = serializers.SerializerMethodField()
    travel_style_choices = serializers.SerializerMethodField()
    duration_choices = serializers.SerializerMethodField()

    def get_preferred_continent_choices(self, obj):
        return dict(TravelPreference.CONTINENTS)  # ✅ Correct way

    def get_climate_choices(self, obj):
        return dict(TravelPreference.CLIMATE_CHOICES)

    def get_activity_choices(self, obj):
        return dict(TravelPreference.ACTIVITY_CHOICES)

    def get_budget_choices(self, obj):
        return dict(TravelPreference.BUDGET_CHOICES)

    def get_travel_style_choices(self, obj):
        return dict(TravelPreference.TRAVEL_STYLE_CHOICES)

    def get_duration_choices(self, obj):
        return dict(TravelPreference.DURATION_CHOICES)

    class Meta:
        model = TravelPreference
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 
            'preferred_continent', 'climate', 'activity', 'budget', 'travel_style', 'duration',
            'preferred_continent_choices', 'climate_choices', 'activity_choices', 
            'budget_choices', 'travel_style_choices', 'duration_choices'
        ]