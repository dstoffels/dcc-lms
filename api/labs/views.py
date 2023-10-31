from CORE import views
from .models import Lab, LabTask, LabTaskAttempt
from rest_framework import generics
from .serializers import LabSerializer, LabTaskAttemptSerializer, LabTaskSerializer
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
import os
import openai
import json
from django.db import IntegrityError
from rest_framework.exceptions import ValidationError


class LabsView(views.LCView):
    queryset = Lab.objects.all()
    serializer_class = LabSerializer

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class LabTaskLCView(views.LCView):
    queryset = LabTask.objects.all()
    Model = LabTask
    parent_kwarg = "lab_id"
    serializer_class = LabTaskSerializer


class LabTaskRUDView(views.RUDView):
    queryset = LabTask.objects.all()
    Model = LabTask
    parent_kwarg = "lab_id"
    lookup_url_kwarg = "task_id"
    serializer_class = LabTaskSerializer


class LabTaskAttemptLCView(views.LCView):
    permission_classes = (IsAuthenticated,)
    serializer_class = LabTaskAttemptSerializer

    def perform_create(self, serializer):
        try:
            serializer.save(student=self.request.user, task_id=self.kwargs.get("task_id"))
        except IntegrityError:
            raise ValidationError({"error": "A task attempt for this student already exists."})

    def get_queryset(self):
        return LabTaskAttempt.objects.filter(task__lab_id=self.kwargs.get("lab_id"), student=self.request.user)


class LabTaskAttemptRUDView(views.RUDView):
    queryset = LabTaskAttempt.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = LabTaskAttemptSerializer
    lookup_url_kwarg = "attempt_id"
    lookup_field = "id"


import requests


class LabTaskCompleteView(generics.GenericAPIView):
    def post(self, request, lab_id, attempt_id):
        code = request.data.get("code")
        attempt: LabTaskAttempt = get_object_or_404(LabTaskAttempt, id=attempt_id)
        attempt.code = code
        attempt.save()

        if not code:
            return Response({"code": "Cannot be empty"}, 400)

        api_key = os.getenv("OPENAI_API_KEY")
        url = "https://api.openai.com/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {api_key}",
        }

        payload = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "system",
                    "content": 'Run code against given task, code must complete task exactly, respond w "y"/"n"',
                },
                {
                    "role": "user",
                    "content": f"lang: {attempt.task.language} Task: {attempt.task.description} Code: {code}",
                },
            ],
            "temperature": 0,
            "max_tokens": 1,
        }

        response = None

        while response is None:
            try:
                response = requests.post(url, json=payload, headers=headers, timeout=3).json()
            except requests.exceptions.Timeout:
                pass

        completed = response.get("choices")[0].get("message").get("content")

        if completed == "y":
            attempt.is_complete = True
            attempt.save()

        return Response(LabTaskAttemptSerializer(attempt).data)
