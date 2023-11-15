from CORE import views
from .models import Cohort, Pace, CohortCourse
from .serializers import PaceSerializer, CohortSerializer, CohortCourseSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated


class CohortLCView(views.LCView):
    serializer_class = CohortSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        cohorts = Cohort.objects.filter(students__id=self.request.user.id)
        # cohorts = Cohort.objects.all()
        return cohorts


class CohortRUDView(views.RUDView):
    lookup_field = "id"
    queryset = Cohort.objects.all()
    serializer_class = CohortSerializer


class PacesView(views.LCView):
    queryset = Pace.objects.all()
    serializer_class = PaceSerializer


class CohortCourseRUDView(views.RUDView):
    queryset = CohortCourse.objects.all()
    serializer_class = CohortCourseSerializer
    lookup_field = "id"
    lookup_url_kwarg = "course_id"
