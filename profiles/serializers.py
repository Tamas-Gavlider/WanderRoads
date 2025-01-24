from rest_framework import serializers
from .models import Profile, Country
from django.conf import settings

class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Profile
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'name',
            'image', 'theme_song', 'experience', 'visited_countries', 'status',
        ]

    