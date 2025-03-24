from django.urls import path
from travel_recommendation import views

urlpatterns = [
    path('travel-recommendation/', views.TravelRecommendationList.as_view()),
    path('travel-recommendation/<int:pk>/',
         views.TravelRecommendationDetail.as_view())
]
