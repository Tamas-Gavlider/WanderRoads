from rest_framework import serializers
from .models import Profile
from django.conf import settings
from django_countries import countries


class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    image = serializers.ImageField(required=False)
    theme_song = serializers.FileField(required=False)
    is_owner = serializers.SerializerMethodField()
    visited_countries = serializers.ListField(child=serializers.CharField(),
                                              required=False)
    posts_count = serializers.ReadOnlyField()

    def validate_image(self, value):
        """
        Profile image upload validation
        """
        if value.size > 2 * 1024 * 1024:
            raise serializers.ValidationError('Image size larger than 2MB!')
        if value.image.height > 4096:
            raise serializers.ValidationError(
                'Image height larger than 4096px!'
            )
        if value.image.width > 4096:
            raise serializers.ValidationError(
                'Image width larger than 4096px!'
            )
        return value

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_visited_countries(self, obj):
        """
        If visited_countries is a list, return the list directly
        """
        return [str(country) for country in obj.visited_countries]

    def update(self, instance, validated_data):
        visited_countries = validated_data.pop('visited_countries', None)
        if visited_countries is not None:
            instance.visited_countries = list(set(visited_countries))
        return super().update(instance, validated_data)

    def validate_theme_song(self, value):
        # Check if the file is an MP3
        if value and not value.name.endswith('.mp3'):
            raise serializers.ValidationError("Please upload an MP3 file.")
        return value

    class Meta:
        model = Profile
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'name',
            'image', 'theme_song', 'experience', 'visited_countries', 'status',
            'is_owner', 'posts_count'
        ]
