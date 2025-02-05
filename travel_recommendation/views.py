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
        travel_recommendation, created = TravelRecommendation.objects.get_or_create(owner=user)
        
        # Generate recommendation only if it doesn't exist or if the destination is empty
        if not travel_recommendation.recommended_destination:
            generate_recommendation(user)  # Generate recommendation if not exists

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