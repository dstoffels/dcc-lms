from CORE import views
from .models import Module
from .serializers import ModuleSerializer
from django.shortcuts import get_object_or_404


class ModuleLCView(views.LCView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer


class ModuleRUDView(views.RUDView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
