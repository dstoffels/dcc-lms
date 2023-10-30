from django.urls import path
from .views import ModuleLCView, ModuleRUDView
from units.views import UnitLCView

urlpatterns = [
    path("", ModuleLCView.as_view(), name="module-list-create"),
    path("/<int:id>", ModuleRUDView.as_view(), name="module-detail"),
    path("/<int:module_id>/units", UnitLCView.as_view(), name="module-detail"),
]
