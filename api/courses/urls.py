from django.urls import path
from . import views

urlpatterns = [
    path("", views.CourseLCView.as_view(), name="course-list-create"),
    path("/<int:id>", views.CourseRUDView.as_view(), name="course-detail"),
    path("/<int:id>/modules", views.CourseModuleLCView.as_view(), name="coursemodule-list-create"),
    path(
        "/<int:course_id>/modules/<int:coursemodule_id>",
        views.CourseModuleRUDView.as_view(),
        name="coursemodule-detail",
    ),
]
