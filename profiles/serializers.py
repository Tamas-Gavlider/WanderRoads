from rest_framework import serializers
from .models import Profile, Country
from django.conf import settings

class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    image = serializers.ImageField(required=False)
    theme_song = serializers.FileField(required=False)
    is_owner = serializers.SerializerMethodField()
    
    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Profile
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'name',
            'image', 'theme_song', 'experience', 'visited_countries', 'status', 'is_owner'
        ]
    