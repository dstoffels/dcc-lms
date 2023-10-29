from rest_framework import serializers
from .models import Module
from units.serializers import UnitSerializer


class ModuleSerializer(serializers.ModelSerializer):
    units = UnitSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = ["id", "name", "description", "course_hours", "is_published", "units"]
