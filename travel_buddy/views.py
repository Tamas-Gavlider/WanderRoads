from rest_framework import generics, permissions, serializers
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
            return TravelBuddy.objects.filter(
                Q(owner=self.request.user) | Q(travel_buddy=self.request.user)
            )
        return TravelBuddy.objects.none()

    def perform_create(self, serializer):
        travel_buddy = self.request.data.get('travel_buddy')
        if travel_buddy == self.request.user.id:
            raise serializers.ValidationError("You cannot add yourself as a travel buddy.")

        if TravelBuddy.objects.filter(
            Q(owner=self.request.user, travel_buddy=travel_buddy) |
            Q(owner=travel_buddy, travel_buddy=self.request.user)
        ).exists():
            raise serializers.ValidationError("This travel buddy relationship already exists.")

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

        if instance.buddy:
            return Response({'status': 'Travel buddy relationship already confirmed'}, status=status.HTTP_200_OK)

        instance.buddy = True
        instance.save()

        return Response({'status': 'Travel buddy relationship fully confirmed'}, status=status.HTTP_200_OK)