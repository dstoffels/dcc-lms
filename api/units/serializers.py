from rest_framework import serializers
from CORE.serializers import BaseSerializer
from .models import Unit, ExternalURL
from labs.serializers import Lab, LabSerializer


class ExternalURLSerializer(BaseSerializer):
    class Meta:
        model = ExternalURL
        fields = "url", "load_in_new_tab"


class UnitSerializer(BaseSerializer):
    data = serializers.DictField(write_only=True)
    module_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Unit
        fields = "id", "module_id", "name", "order", "type", "data"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.type == "external_url":
            eu = ExternalURL.objects.get(unit=instance)
            representation["data"] = ExternalURLSerializer(eu).data
        elif instance.type == "lab":
            lab = Lab.objects.get(unit=instance)
            representation["data"] = LabSerializer(lab).data
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
            validated_data["data"] = serializer.data

        return validated_data

    def create(self, validated_data):
        unit_type = validated_data.get("type")
        type_data = validated_data.pop("data", {})

        unit = super().create(validated_data)

        if unit_type == "external_url":
            ExternalURL.objects.create(**type_data, unit=unit)
        elif unit_type == "lab":
            Lab.objects.create(**type_data, unit=unit)
        return unit

    def update(self, instance, validated_data):
        type_data = validated_data.pop("data", {})

        unit = super().update(instance, validated_data)

        if unit.type == "external_url":
            srlzr = ExternalURLSerializer()
