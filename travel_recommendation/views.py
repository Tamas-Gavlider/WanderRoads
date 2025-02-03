from rest_framework import generics, permissions
from wonder_roads_api.permissions import IsOwnerOrReadOnly
from .models import TravelRecommendation, TravelPreference
from .serializers import TravelRecommendationSerializer


class TravelRecommendationList(generics.ListCreateAPIView):
    """
    List all travel buddies or create a new travel buddy relationship.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = TravelRecommendationSerializer
    
    def get_queryset(self):
        """Ensure that only the travel recommendations of the logged-in user are shown."""
        return TravelRecommendation.objects.filter(owner=self.request.user)


class TravelPreferenceDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieve or destroy a travel buddy relationship.
    Allow either party to confirm the relationship.
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = TravelRecommendationSerializer

    def get_queryset(self):
        """
        Ensure that only the travel preference of the logged-in user is accessible.
        """
        return TravelRecommendation.objects.filter(owner=self.request.user)

