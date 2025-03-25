from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie, vary_on_headers
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

    # Cache the profile list for 1 hour (3600 seconds)
    @method_decorator(cache_page(60 * 60))
    # Different cache for different users
    @method_decorator(vary_on_headers("Authorization"))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class ProfileDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update a profile if you're the owner.
    """
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    # Cache profile details for 30 minutes
    @method_decorator(cache_page(60 * 30))
    # Different cache for different users
    @method_decorator(vary_on_headers("Authorization"))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
