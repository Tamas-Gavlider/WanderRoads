from rest_framework import serializers
from .models import Profile, Country
from django.conf import settings

class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    visited_countries = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    theme_song = serializers.SerializerMethodField()
    visited_country_ids = serializers.ListField(write_only=True, child=serializers.IntegerField())

    class Meta:
        model = Profile
        fields = [
            'id', 'owner', 'created_at', 'updated_at', 'name',
            'image', 'theme_song', 'experience', 'visited_countries', 'status',
            'visited_country_ids'  # Add visited_country_ids as a write-only field
        ]

    def get_image(self, obj):
        # Ensure that the image URL includes Cloudinary's base URL
        if obj.image:
            return f"https://res.cloudinary.com/{settings.CLOUDINARY_STORAGE['dfi7tw6ox']}/image/upload/{obj.image.public_id}"
        return None

    def get_theme_song(self, obj):
        # Ensure that the theme song URL includes Cloudinary's base URL
        if obj.theme_song:
            return f"https://res.cloudinary.com/{settings.CLOUDINARY_STORAGE['dfi7tw6ox']}/video/upload/{obj.theme_song.public_id}"
        return None

    def get_visited_countries(self, obj):
        """Return visited countries as a list of country objects."""
        countries = obj.visited_countries.all()  # Assuming this is a ManyToManyField
        return [{'id': country.id, 'name': country.name} for country in countries]

    def update(self, instance, validated_data):
        """Handle updating visited countries and other profile fields."""
        country_ids = validated_data.pop('visited_country_ids', [])
        # Set visited countries by their IDs
        instance.visited_countries.set(Country.objects.filter(id__in=country_ids))
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance