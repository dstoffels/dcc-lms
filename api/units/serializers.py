from rest_framework import serializers
from CORE.serializer import ModelSerializer
from .models import Unit, Lab, LabTask, ExternalURL


class ExternalURLSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExternalURL
        fields = ["url", "load_in_new_tab"]


class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = ["due_date", "points"]


class UnitSerializer(ModelSerializer):
    data = serializers.DictField(write_only=True)

    class Meta:
        model = Unit
        fields = "id", "name", "order", "module_id", "type", "data"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.type == "external_url":
            eu = ExternalURL.objects.get(unit=instance)
            representation["data"] = ExternalURLSerializer(eu).data
        elif instance.type == "lab":
            representation["data"] = representation.pop("lab")
        return representation


class LabTaskSerializer(ModelSerializer):
    class Meta:
        model = LabTask
        fields = "__all__"
