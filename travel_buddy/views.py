from rest_framework import generics, permissions
from wonder_roads_api.permissions import IsOwnerOrReadOnly
from .models import TravelBuddy
from .serializers import TravelBuddySerializer


class TravelBuddyList(generics.ListCreateAPIView):
    """
    List all travel buddies or create a new travel buddy relationship.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = TravelBuddySerializer
    queryset = TravelBuddy.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class TravelBuddyDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieve or destroy a travel buddy relationship.
    Allow either party to confirm the relationship.
    """
    permission_classes = [IsOwnerOrReadOnly]
    queryset = TravelBuddy.objects.all()
    serializer_class = TravelBuddySerializer