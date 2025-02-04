from rest_framework import generics, permissions
from wonder_roads_api.permissions import IsOwnerOrReadOnly
from .models import TravelRecommendation
from .serializers import TravelRecommendationSerializer
from .recommendation import generate_recommendation


class TravelRecommendationList(generics.ListAPIView):
    """
    List travel recommendations for the logged-in user.
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TravelRecommendationSerializer
    
    def get_queryset(self):
        user = self.request.user
        if not TravelRecommendation.objects.filter(owner=user).exists():
            generate_recommendation(user)  # Generate recommendations if none exist
        return TravelRecommendation.objects.filter(owner=user)


class TravelRecommendationDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieve or delete a specific travel recommendation.
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = TravelRecommendationSerializer

    def get_queryset(self):
        """Ensure only the user's recommendations are accessible."""
        return TravelRecommendation.objects.filter(owner=self.request.user)