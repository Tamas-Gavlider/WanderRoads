from django.urls import path
from travel_preference import views

urlpatterns = [
    path('travel-preference/', views.TravelPreferenceList.as_view()),
    path('travel-preference/<int:pk>/', views.TravelPreferenceDetail.as_view())
]