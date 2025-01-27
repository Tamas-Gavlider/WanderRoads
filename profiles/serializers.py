from rest_framework import serializers
from .models import Profile
from django.conf import settings
from django_countries import countries
from travel_buddy.models import TravelBuddy

class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    image = serializers.ImageField(required=False)
    theme_song = serializers.FileField(required=False)
    is_owner = serializers.SerializerMethodField()
    visited_countries = serializers.ListField(child=serializers.CharField())
    travel_buddy_id = serializers.SerializerMethodField()
    
    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner
    
    def get_visited_countries(self, obj):
        # If visited_countries is a list, return the list directly (no need for .all())
        return [str(country) for country in obj.visited_countries]
    
    def get_travel_buddy_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            buddy = TravelBuddy.objects.filter(
                owner=user, travel_buddy= obj.owner
            ).first()
            print(buddy)
            return buddy.id if buddy else None
        return None

    class Meta:
        model = Profile
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'name',
            'image', 'theme_song', 'experience', 'visited_countries', 'status', 'is_owner',
            'travel_buddy_id'
        ]
    