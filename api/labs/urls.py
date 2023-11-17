from django.urls import path
from . import views

urlpatterns = [
    path("/<int:lab_id>/tasks", views.LabTaskLCView.as_view()),
    path("/<int:lab_id>/tasks/<int:task_id>", views.LabTaskRUDView.as_view()),
    path(
        "/<int:lab_id>/tasks/<int:task_id>/attempt",
        views.LabTaskAttemptRetrieveView.as_view(),
    ),
    path("/<int:lab_id>/attempts", views.LabTaskAttemptLCView.as_view()),
    path(
        "/<int:lab_id>/attempts/<int:attempt_id>", views.LabTaskAttemptRUDView.as_view()
    ),
    path(
        "/<int:lab_id>/attempts/<int:attempt_id>/complete",
        views.CompleteAttemptView.as_view(),
    ),
    path(
        "/<int:lab_id>/attempts/<int:attempt_id>/assistant",
        views.TaskAssistantView.as_view(),
    ),
    # path("labs", LabsView.as_view()),
    # path("labs/<int:lab_id>/tasks/<int:task_id>/submit", TaskSubmitView.as_view()),
]
