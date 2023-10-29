from django.urls import path
from .views import ModuleLCView, ModuleRUDView

urlpatterns = [
    path("", ModuleLCView.as_view(), name="module-list-create"),
    path("/<int:id>", ModuleRUDView.as_view(), name="module-detail"),
]
