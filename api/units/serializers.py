from CORE.serializer import ModelSerializer
from .models import Lab, LabTask


class LabTaskSerializer(ModelSerializer):
    class Meta:
        model = LabTask
        fields = "__all__"


class LabSerializer(ModelSerializer):
    tasks = LabTaskSerializer(many=True)

    class Meta:
        model = Lab
        fields = "id", "title", "tasks"
