from rest_framework import generics, permissions
from django.db.models import Q
from wonder_roads_api.permissions import IsOwnerOrReadOnly
from .models import TravelBuddy
from .serializers import TravelBuddySerializer


class TravelBuddyList(generics.ListCreateAPIView):
    """
    List all travel buddies or create a new travel buddy relationship.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = TravelBuddySerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            # Return only travel buddy relationships involving the authenticated user
            return TravelBuddy.objects.filter(
                Q(owner=self.request.user) | Q(travel_buddy=self.request.user)
            )
        # For unauthenticated users, return an empty queryset
        return TravelBuddy.objects.none()

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

    def patch(self, request, *args, **kwargs):
        """
        Confirm a travel buddy relationship.
        """
        instance = self.get_object()
        user = request.user

        if user not in [instance.owner, instance.travel_buddy]:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

        if instance.confirm_travel(user):
            return Response({'status': 'Travel buddy relationship fully confirmed'}, status=status.HTTP_200_OK)

        return Response({'status': 'Confirmation saved, waiting for the other party to confirm.'}, status=status.HTTP_202_ACCEPTED)