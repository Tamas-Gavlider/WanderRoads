from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_headers
from django.http import Http404, JsonResponse
from django.db.models import Count
from rest_framework import permissions, generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Post
from .serializers import PostSerializer
from wonder_roads_api.permissions import IsOwnerOrReadOnly
from django_countries import countries


# Create your views here.

class CountryListView(APIView):
    """
    API endpoint that returns all available countries
    Cache for 24 hours
    """
    @method_decorator(cache_page(60 * 60 * 24))
    def get(self, request):
        country_list = [{"code": code, "name": name} for code,
                        name in countries]
        return Response(country_list)


class PostList(generics.ListCreateAPIView):
    """
    List posts or create a post if logged in
    The perform_create method associates the post with the logged in user.
    """
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Post.objects.annotate(
        comments_count=Count('comment', distinct=True)
    ).order_by('-created_at')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend
    ]

    filterset_fields = [
        'owner__profile'
    ]

    search_fields = [
        'owner__username',
        'title',
        'country'
    ]

    ordering_fields = [
        'comments_count',
    ]

    # Cache for 15 minutes
    @method_decorator(cache_page(60 * 15))
    # Cache per user session
    @method_decorator(vary_on_headers("Authorization"))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get(self, request, *args, **kwargs):
        country_post_counts = (
            Post.objects.values('country')
            .annotate(post_count=Count('id'))
            .order_by('-post_count')
        )

        country_data = {}
        for entry in country_post_counts:
            country_name = countries.name(entry['country'])
            country_data[country_name] = entry['post_count']

        response = super().get(request, *args, **kwargs)
        response.data["country_post_counts"] = country_data
        return response


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Post.objects.annotate(
        comments_count=Count('comment', distinct=True)
    ).order_by('-created_at')

    # Cache for 10 minutes
    @method_decorator(cache_page(60 * 10))
    # Cache per user session
    @method_decorator(vary_on_headers("Authorization"))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request, *args, **kwargs):
        print("User making request:", request.user)
        if not request.user.is_authenticated:
            return JsonResponse({"error": "Authentication required"},
                                status=403)
        return super().get(request, *args, **kwargs)
        return super().get(request, *args, **kwargs)
