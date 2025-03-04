from rest_framework import generics, permissions
from .models import TravelBuddy
from .serializers import TravelBuddySerializer
from django.db import IntegrityError

class TravelBuddyList(generics.ListCreateAPIView):
    """
    List all travel buddies or create a new travel buddy relationship.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = TravelBuddySerializer
    queryset = TravelBuddy.objects.all()

    def perform_create(self, serializer):
        # Check if the request user is the 'owner' of the travel buddy relationship
        owner = self.request.user
        travel_buddy = serializer.validated_data['travel_buddy']

        # Check if the reverse relationship already exists
        if TravelBuddy.objects.filter(owner=travel_buddy, travel_buddy=owner).exists():
            raise serializers.ValidationError({'detail': 'This travel buddy relationship already exists from the other side.'})

        # Save the travel buddy relationship
        serializer.save(owner=owner)


class TravelBuddyDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieve or destroy a travel buddy relationship.
    Allow either party to confirm the relationship.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = TravelBuddy.objects.all()
    serializer_class = TravelBuddySerializer
