from django.http import Http404
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Trip
from .serializers import TripSerializer
from wonder_roads_api.permissions import IsOwnerOrReadOnly

# Create your views here.


class TriptList(generics.ListCreateAPIView):
    serializer_class = TripSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    def get_queryset(self):
        """
        Returns a list of all trips for the currently logged-in user.
        """
        return Trip.objects.filter(owner=self.request.user)


class TripDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = TripSerializer
    queryset = Trip.objects.all()
