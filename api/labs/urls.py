from django.urls import path
from .views import (
    LabTaskLCView,
    LabTaskRUDView,
    CompleteAttemptView,
    LabTaskAttemptLCView,
    LabTaskAttemptRUDView,
    TaskAssistantView,
)

urlpatterns = [
    path("/<int:lab_id>/tasks", LabTaskLCView.as_view()),
    path("/<int:lab_id>/tasks/<int:task_id>", LabTaskRUDView.as_view()),
    path("/<int:lab_id>/tasks/<int:task_id>/attempts", LabTaskAttemptLCView.as_view()),
    path("/<int:lab_id>/attempts/<int:attempt_id>", LabTaskAttemptRUDView.as_view()),
    path("/<int:lab_id>/attempts/<int:attempt_id>/complete", CompleteAttemptView.as_view()),
    path("/<int:lab_id>/attempts/<int:attempt_id>/assistant", TaskAssistantView.as_view()),
    # path("labs", LabsView.as_view()),
    # path("labs/<int:lab_id>/tasks/<int:task_id>/submit", TaskSubmitView.as_view()),
]