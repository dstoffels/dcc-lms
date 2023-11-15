from django.urls import path
from . import views

urlpatterns = [
    path("", views.CohortLCView.as_view()),
    path("/paces", views.PacesView.as_view()),
    path("/<int:cohort_id>/courses/<course_id>", views.CohortCourseRUDView.as_view()),
]
