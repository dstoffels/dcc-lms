from django.urls import path
from . import views

urlpatterns = [
    path("", views.ProgramLCView.as_view()),
    path("/<int:id>", views.ProgramRUDView.as_view()),
    path(
        "/<int:id>/courses",
        views.ProgramCourseLCView.as_view(),
    ),
    path(
        "/<int:program_id>/courses/<int:course_id>",
        views.ProgramCourseRUDView.as_view(),
    ),
]
