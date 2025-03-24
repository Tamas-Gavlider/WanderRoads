from rest_framework import generics
from django.db.models import Count
from django.http import Http404
from rest_framework import status, filters, generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
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
        posts_count=Count('owner__post', distinct=True)
    ).order_by('-posts_count', 'owner')
    serializer_class = ProfileSerializer
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = [
        'owner',
    ]
    ordering_fields = [
        '-posts_count',
        'owner'
    ]
    search_fields = [
        'owner__username'
    ]


class ProfileDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update a profile if you're the owner.
    """
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
