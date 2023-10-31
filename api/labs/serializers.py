from rest_framework import serializers
from CORE.serializers import BaseSerializer
from .models import Lab, LabTask, LabTaskAttempt


class LabTaskSerializer(BaseSerializer):
    lab_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = LabTask
        fields = "id", "lab_id", "description", "language", "order"


class LabSerializer(BaseSerializer):
    tasks = LabTaskSerializer(many=True, read_only=True)

    class Meta:
        model = Lab
        fields = "due_date", "points", "tasks"


class LabTaskAttemptSerializer(BaseSerializer):
    task = LabTaskSerializer(read_only=True)
    is_complete = serializers.BooleanField(read_only=True)

    class Meta:
        model = LabTaskAttempt
        fields = (
            "id",
            "code",
            "is_complete",
            "messages",
            "hints",
            "task",
        )
