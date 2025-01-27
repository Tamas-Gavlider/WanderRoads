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
    queryset = Trip.objects.all()
                        
class TripDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = TripSerializer
    queryset = Trip.objects.all()
        
   