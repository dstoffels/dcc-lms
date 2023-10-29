from CORE import views
from .models import Track, TrackCourse
from .serializers import TrackSerializer, TrackCourseSerializer
from django.shortcuts import get_object_or_404


class TrackLCView(views.LCView):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer


class TrackRUDView(views.RUDView):
    lookup_field = "id"
    queryset = Track.objects.all()
    serializer_class = TrackSerializer


class TrackCourseLCView(views.LCView):
    serializer_class = TrackCourseSerializer

    def get_queryset(self):
        return TrackCourse.objects.filter(track__id=self.kwargs["id"])


class TrackCourseRUDView(views.RUDView):
    serializer_class = TrackCourseSerializer

    def get_object(self):
        return get_object_or_404(TrackCourse, id=self.kwargs.get("trackcourse_id"))
