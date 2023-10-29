from CORE import views
from .models import Track, TrackCourse
from .serializers import TrackSerializer, TrackCourseSerializer


class TrackLCView(views.LCView):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer


class TrackRUDView(views.RUDView):
    lookup_field = "id"
    queryset = Track.objects.all()
    serializer_class = TrackSerializer


class TrackCourseLCView(views.LCView):
    queryset = TrackCourse.objects.all()
    serializer_class = TrackCourseSerializer

    def get_queryset(self):
        return TrackCourse.objects.filter(track__id=self.kwargs["id"])


class TrackCourseRUDView(views.RUDView):
    queryset = TrackCourse.objects.all()
    serializer_class = TrackCourseSerializer

    def get_object(self):
        return TrackCourse.objects.get(track__id=self.kwargs["track_id"], course__id=self.kwargs["course_id"])
