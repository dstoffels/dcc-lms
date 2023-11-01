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
    # permission_classes = (IsAuthenticated,)
    serializer_class = LabTaskAttemptSerializer
    lookup_url_kwarg = "attempt_id"
    lookup_field = "id"


import requests

url = "https://api.openai.com/v1/chat/completions"
api_key = os.getenv("OPENAI_API_KEY")
headers = {
    "Authorization": f"Bearer {api_key}",
}


class CompleteAttemptView(generics.GenericAPIView):
    def post(self, request, lab_id, attempt_id):
        code = request.data.get("code")
        if not code:
            return Response({"code": "Cannot be empty"}, 400)

        attempt: LabTaskAttempt = get_object_or_404(LabTaskAttempt, id=attempt_id)
        attempt.code = code
        attempt.hint = ""
        attempt.save()

        request_body = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "system",
                    "content": 'Run code against given task, code must complete task exactly, respond w "y"/"n"',
                },
                {
                    "role": "user",
                    "content": f"LANG: {attempt.task.language} TASK: {attempt.task.description} CODE: {code}",
                },
            ],
            "temperature": 0,
            "max_tokens": 1,
        }

        response = None

        while response is None:
            try:
                response = requests.post(url, json=request_body, headers=headers, timeout=3).json()
            except requests.exceptions.Timeout:
                pass

        completed = response.get("choices")[0].get("message").get("content")

        if completed == "y":
            attempt.is_complete = True
            attempt.hint = "Task complete!\nGreat work!"
            attempt.save()
        else:
            attempt.is_complete = False
            attempt.hint = "Double-check your code, review your resources or click get help below!"
            attempt.save()

        return Response(LabTaskAttemptSerializer(attempt).data)


class TaskAssistantView(generics.GenericAPIView):
    """Captures hints from openai to guide student. Could be setup to ping slack after 3-5 ai assists. Could be setup to nerf spamming with a 2-5min cooldown between requests"""

    def get(self, request, lab_id, attempt_id):
        # code = request.data.get("code")
        # if not code:
        #     return Response({"code": "Cannot be empty"}, 400)

        attempt: LabTaskAttempt = get_object_or_404(LabTaskAttempt, id=attempt_id)
        is_first_request = len(attempt.messages) is 0
        max_tokens = 50

        prompt = {
            "role": "user",
            "content": f"LANG: {attempt.task.language}\nTASK: {attempt.task.description}\nPlease provide a single, specific hint that guides me toward the TASK.\n\nCODE:\n{attempt.code}\n",
        }
        if is_first_request:
            attempt.messages = [
                {
                    "role": "system",
                    "content": f"Your role is to evaluate the user's most recent code against the task they are trying to accomplish. Provide a single, specific hint that guides the user towards the next immediate step they should take to meet the task requirements. Your hint must not exceed 50 tokens, should not give away the answer, and should not include unnecessary text.",
                },
                prompt,
            ]
        elif not attempt.is_complete:
            attempt.messages = [
                *attempt.messages,
                {
                    "role": "system",
                    "content": f"Remember, your hint must be less than {max_tokens} tokens, must be a singular hint and should not provide the answer. It should guide the user towards finding the solution themselves.",
                },
                prompt,
            ]
        elif attempt.is_complete:
            attempt.messages = [
                *attempt.messages,
                {
                    "role": "user",
                    "content": f"Please sniff my code to help guide me toward best practices in {max_tokens} tokens or fewer\n\n{attempt.code}",
                },
            ]

        request_body = {
            "model": "gpt-3.5-turbo",
            "messages": attempt.messages,
            "temperature": 0,
            "max_tokens": max_tokens,
        }

        response = None

        while response is None:
            try:
                response = requests.post(url, json=request_body, headers=headers, timeout=10).json()
            except requests.exceptions.Timeout:
                pass

        hint_msg = response.get("choices")[0].get("message")

        attempt.messages = [*attempt.messages, hint_msg]
        attempt.hint = hint_msg.get("content")
        attempt.save()

        return Response(LabTaskAttemptSerializer(attempt).data)
