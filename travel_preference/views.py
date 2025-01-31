from rest_framework import generics, permissions
from wonder_roads_api.permissions import IsOwnerOrReadOnly
from rest_framework import serializers
from .models import TravelPreference
from .serializers import TravelPreferenceSerializer


class TravelPreferenceList(generics.ListCreateAPIView):
    """
    List all travel buddies or create a new travel buddy relationship.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = TravelPreferenceSerializer
    
    def get_queryset(self):
        """
        Ensure that only the travel preference of the logged-in user is shown.
        """
        return TravelPreference.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        # Check if the user already has a travel preference
        if TravelPreference.objects.filter(owner=self.request.user).exists():
            raise serializers.ValidationError("You can only have one travel preference.")
        # Save the new preference with the user as the owner.
        serializer.save(owner=self.request.user)

class TravelPreferenceDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve or destroy a travel buddy relationship.
    Allow either party to confirm the relationship.
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = TravelPreferenceSerializer

    def get_queryset(self):
        """
        Ensure that only the travel preference of the logged-in user is accessible.
        """
        return TravelPreference.objects.filter(owner=self.request.user)

