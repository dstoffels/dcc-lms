from django.urls import path
from .views import UnitTypesView, UnitRUDView

urlpatterns = [
    path("/types", UnitTypesView.as_view(), name="unit-types"),
    path("/<int:id>", UnitRUDView.as_view(), name="unit-types"),
    # path("labs", LabsView.as_view()),
    # path("labs/<int:lab_id>/tasks/<int:task_id>/submit", TaskSubmitView.as_view()),
]
