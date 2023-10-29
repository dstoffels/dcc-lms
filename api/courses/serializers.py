from rest_framework import serializers
from .models import Course, CourseModule, Tag
from modules.serializers import ModuleSerializer
from rest_framework.exceptions import ValidationError


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]


class CourseModuleSerializer(serializers.ModelSerializer):
    module = ModuleSerializer(read_only=True)
    course_id = serializers.IntegerField(write_only=True)
    module_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = CourseModule
        fields = ["id", "course_id", "module_id", "module", "order", "follows_drip"]

    def update(self, course_module, validated_data):
        errors = []

        if "course_id" in validated_data and course_module.course_id != validated_data["course_id"]:
            errors.append({"course_id": "This field cannot be modified."})

        if "module_id" in validated_data and course_module.module_id != validated_data["module_id"]:
            errors.append({"module_id": "This field cannot be modified."})

        if len(errors) > 0:
            raise ValidationError(errors, code=400)

        return super().update(course_module, validated_data)


class CourseSerializer(serializers.ModelSerializer):
    modules = CourseModuleSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)

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
