from django.shortcuts import render
from rest_framework import generics
from .models import Lab, LabTask
from .serializers import LabSerializer
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
import os
import openai
import json


class LabsView(generics.ListCreateAPIView):
    queryset = Lab.objects.all()
    serializer_class = LabSerializer

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class TaskSubmitView(generics.GenericAPIView):
    def post(self, request, lab_id, task_id):
        task: LabTask = get_object_or_404(LabTask, id=task_id)
        code = request.data.get("code")

        openai.api_key = os.getenv("OPENAI_API_KEY")

        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are an encouraging instructor at a coding bootcamp. You can only respond with a JSON object containing two properties: task_complete: boolean, explanation: string. You will evaluate a student's code against a given task to determine if the student completed the task. Your explanation will gently guide the student toward the answer without providing the solution.",
                },
                {
                    "role": "user",
                    "content": f"Student's task: ${task.description}; Student's code: ${code}; Language used: ${task.language}",
                },
            ],
            temperature=0.2,
        )

        response = json.loads(completion.choices[0].message.content)

        return Response(response)
