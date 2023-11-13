from CORE import views
from .models import Cohort, Pace
from .serializers import PaceSerializer, CohortSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated


class CohortLCView(views.LCView):
    serializer_class = CohortSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Cohort.objects.filter(students__id=self.request.user.id)


class CohortRUDView(views.RUDView):
    lookup_field = "id"
    queryset = Cohort.objects.all()
    serializer_class = CohortSerializer


class PacesView(views.LCView):
    queryset = Pace.objects.all()
    serializer_class = PaceSerializer
