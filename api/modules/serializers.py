from rest_framework import serializers
from .models import Module


class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = ["id", "title", "description", "course_hours", "is_published"]
