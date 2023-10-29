from django.urls import path
from . import views

urlpatterns = [
    path("", views.TrackLCView.as_view(), name="track-list-create"),
    path("/<int:id>", views.TrackRUDView.as_view(), name="track-detail"),
    path("/<int:id>/courses", views.TrackCourseLCView.as_view(), name="trackcourse-list-create"),
    path(
        "/<int:track_id>/courses/<int:course_id>",
        views.TrackCourseRUDView.as_view(),
        name="trackcourse-detail",
    ),
]
