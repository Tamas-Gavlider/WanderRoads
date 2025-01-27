from django.urls import path
from travel_buddy import views

urlpatterns = [
    path('travel-buddy/', views.TravelBuddyList.as_view()),
    path('travel-buddy/<int:pk>/', views.TravelBuddyDetail.as_view())
]