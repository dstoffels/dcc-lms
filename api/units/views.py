from CORE import views
from .models import Unit
from rest_framework import generics
from .models import Lab, LabTask
from .serializers import LabSerializer
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from .serializers import UnitSerializer
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
                    "content": "You are an encouraging instructor at a coding bootcamp. You can only respond with a JSON object containing: task_complete: boolean, output: string, explanation: string. You will run the student's code and evaluate it against a given task to determine if the student completed the task. The output will be the result of running the student's code. Your explanation will gently guide the student toward the answer without providing the solution.",
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


class UnitLCView(views.LCView):
    queryset = Unit.objects.all()
    Model = Unit
    parent_kwarg = "module_id"
    serializer_class = UnitSerializer


class UnitRUDView(views.RUDView):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer


class UnitTypesView(generics.ListAPIView):
    def get(self, request, *args, **kwargs):
        return Response({"unit_types": [{"value": type[0], "text": type[1]} for type in Unit.UNIT_TYPE_CHOICES]})
