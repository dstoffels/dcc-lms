from CORE import views
from .models import Program, ProgramCourse
from .serializers import ProgramSerializer, ProgramCourseSerializer
from django.shortcuts import get_object_or_404


class ProgramLCView(views.LCView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer


class ProgramRUDView(views.RUDView):
    lookup_field = "id"
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer


class ProgramCourseLCView(views.LCView):
    serializer_class = ProgramCourseSerializer

    def get_queryset(self):
        return ProgramCourse.objects.filter(program__id=self.kwargs["id"])


class ProgramCourseRUDView(views.RUDView):
    serializer_class = ProgramCourseSerializer

    def get_object(self):
        return get_object_or_404(
            ProgramCourse,
            program_id=self.kwargs.get("program_id"),
            course_id=self.kwargs.get("course_id"),
        )
