from django.urls import path
from .views import CountryListView, PostList, PostDetail

urlpatterns = [
    path('posts/', PostList.as_view(), name="post-list"),
    path('posts/<int:pk>/', PostDetail.as_view(), name="post-detail"),
    path("countries/", CountryListView.as_view(), name="country-list"),
]
