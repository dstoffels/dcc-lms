from django.urls import path
from .views import LabsView, TaskSubmitView

urlpatterns = [
    path("labs", LabsView.as_view()),
    path("labs/<int:lab_id>/tasks/<int:task_id>/submit", TaskSubmitView.as_view()),
]
