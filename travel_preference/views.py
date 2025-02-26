from rest_framework.response import Response
from wonder_roads_api.permissions import IsOwnerOrReadOnly
from rest_framework import serializers, status, generics, permissions
from .models import TravelPreference
from .serializers import TravelPreferenceSerializer


class TravelPreferenceList(generics.ListCreateAPIView):
    """
    List the logged-in user's travel preference or create a new one.
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TravelPreferenceSerializer

    def get(self, request, *args, **kwargs):
        """
        Ensure that only the travel preference of the logged-in user is shown.
        """
        preference = TravelPreference.objects.filter(owner=request.user).first()
        if preference:
            serializer = self.get_serializer(preference)
            return Response(serializer.data)
        return Response({"detail": "No travel preference found."}, status=status.HTTP_404_NOT_FOUND)

    def perform_create(self, serializer):
        # Ensure that the user can only create one travel preference
        if TravelPreference.objects.filter(owner=self.request.user).exists():
            raise serializers.ValidationError("You can only have one travel preference.")
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

