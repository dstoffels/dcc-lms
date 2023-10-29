from rest_framework import serializers
from .models import Course, CourseModule, Tag
from modules.serializers import ModuleSerializer


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]


class CourseModuleSerializer(serializers.ModelSerializer):
    module = ModuleSerializer()

    class Meta:
        model = CourseModule
        fields = ["id", "course", "module", "order", "follows_drip"]


class CourseSerializer(serializers.ModelSerializer):
    modules = CourseModuleSerializer(many=True)
    tags = TagSerializer(many=True)

    class Meta:
        model = Course
        fields = [
            "id",
            "code",
            "name",
            "description",
            "owner",
            "prerequisites",
            "tags",
            "is_public",
            "is_template",
            "is_published",
            "is_archived",
            "modules",
        ]
