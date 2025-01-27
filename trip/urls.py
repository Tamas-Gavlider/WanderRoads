from django.urls import path
from trip import views

urlpatterns = [
    path('trip/', views.TriptList.as_view()),
    path('trip/<int:pk>', views.TripDetail.as_view())
]