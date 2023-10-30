from rest_framework import serializers
from CORE.serializers import BaseSerializer
from .models import Unit, Lab, LabTask, ExternalURL


class ExternalURLSerializer(BaseSerializer):
    class Meta:
        model = ExternalURL
        fields = "url", "load_in_new_tab"


class LabSerializer(BaseSerializer):
    class Meta:
        model = Lab
        fields = "due_date", "points"


class UnitSerializer(BaseSerializer):
    data = serializers.DictField(write_only=True)

    class Meta:
        model = Unit
        fields = "id", "name", "order", "type", "data"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.type == "external_url":
            eu = ExternalURL.objects.get(unit=instance)
            representation["data"] = ExternalURLSerializer(eu).data
        elif instance.type == "lab":
            representation["data"] = representation.pop("lab")
        return representation

    def validate(self, data):
        validated_data = super().validate(data)
        unit_type = data.get("type")
        type_data = data.get("data", {})

        if unit_type == "external_url":
            serializer = ExternalURLSerializer(data=type_data)
            serializer.is_valid()
        elif unit_type == "lab":
            serializer = LabSerializer(data=type_data)
            serializer.is_valid()

        return validated_data

    def create(self, validated_data):
        unit_type = validated_data.pop("type")
        type_data = validated_data.pop("data", {})

        unit = super().create(validated_data)

        if unit_type == "external_url":
            ExternalURL.objects.create(**type_data, unit=unit)
        elif unit_type == "lab":
            Lab.objects.create(**type_data, unit=unit)
        return unit


class LabTaskSerializer(BaseSerializer):
    class Meta:
        model = LabTask
        fields = "__all__"
