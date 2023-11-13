from django.urls import path
from . import views

urlpatterns = [
    path("", views.CohortLCView.as_view()),
    path("/paces", views.PacesView.as_view()),
]
