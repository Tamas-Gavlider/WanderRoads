from rest_framework import generics
from django.db.models import Count
from django.http import Http404
from rest_framework import status, filters, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Profile
from .serializers import ProfileSerializer
from wonder_roads_api.permissions import IsOwnerOrReadOnly

# Create your views here.

class ProfileList(generics.ListAPIView):
    """
    List all profiles.
    No create view as profile creation is handled by django signals.
    """
    queryset = Profile.objects.annotate(
        posts_count= Count('owner__post', distinct= True),
    )
    serializer_class = ProfileSerializer

    
class ProfileDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update a profile if you're the owner.
    """
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    
    def get_object(self, pk):
        try:
            profile = Profile.objects.get(pk=pk)
            self.check_object_permissions(self.request, profile)
            return profile
        except Profile.DoesNotExist:
            raise Http404
        
    def get(self, request, pk):
        profile = self.get_object(pk)
        serializer = ProfileSerializer(profile, context={'request':request})
        return Response(serializer.data)
    
    def put(self, request, pk):
        profile = self.get_object(pk)
        visited_countries = request.data.get('visited_countries', [])
        # Ensure visited_countries is a list of country codes (strings)
        if isinstance(visited_countries, str):
            visited_countries = [visited_countries]
        # Update the visited_countries list in the model
        profile.visited_countries = visited_countries
        profile.save()
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)