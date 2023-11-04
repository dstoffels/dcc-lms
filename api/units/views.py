from CORE import views
from .models import Unit
from rest_framework import generics
from rest_framework.response import Response
from .serializers import UnitSerializer
from rest_framework.permissions import IsAuthenticated


class UnitLCView(views.LCView):
    permission_classes = (IsAuthenticated,)
    queryset = Unit.objects.all()
    Model = Unit
    parent_kwarg = "module_id"
    serializer_class = UnitSerializer


class UnitRUDView(views.RUDView):
    permission_classes = (IsAuthenticated,)
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer


class UnitTypesView(generics.ListAPIView):
    def get(self, request, *args, **kwargs):
        return Response({"unit_types": [{"value": type[0], "text": type[1]} for type in Unit.UNIT_TYPE_CHOICES]})
