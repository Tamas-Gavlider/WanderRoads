from django.urls import path
from .views import CountryListView, PostList, PostDetail 

urlpatterns = [
    path('post/', PostList.as_view()),
    path('post/<int:pk>/', PostDetail.as_view()),
    path("countries/", CountryListView.as_view(), name="country-list"),

]