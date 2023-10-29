from CORE import views
from .models import Course, CourseModule
from .serializers import CourseSerializer, CourseModuleSerializer
from django.shortcuts import get_object_or_404


class CourseLCView(views.LCView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class CourseRUDView(views.RUDView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class CourseModuleLCView(views.LCView):
    serializer_class = CourseModuleSerializer

    def get_queryset(self):
        return CourseModule.objects.filter(course__id=self.kwargs["id"])


class CourseModuleRUDView(views.RUDView):
    serializer_class = CourseModuleSerializer

    def get_object(self):
        return get_object_or_404(CourseModule, id=self.kwargs.get("coursemodule_id"))
