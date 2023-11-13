from rest_framework import serializers
from CORE.serializers import BaseSerializer
from courses.serializers import CourseSerializer
from .models import Program, ProgramCourse
from rest_framework.exceptions import ValidationError


class ProgramCourseSerializer(BaseSerializer):
    course = CourseSerializer(read_only=True)
    course_id = serializers.IntegerField(write_only=True)
    program_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = ProgramCourse
        fields = ["id", "program_id", "course_id", "order", "follows_drip", "course"]

    def update(self, instance, validated_data):
        errors = []

        if (
            "program_id" in validated_data
            and instance.program_id != validated_data["program_id"]
        ):
            errors.append({"program_id": "This field cannot be modified."})

        if (
            "course_id" in validated_data
            and instance.course_id != validated_data["course_id"]
        ):
            errors.append({"course_id": "This field cannot be modified."})

        if len(errors) > 0:
            raise ValidationError(errors, code=400)
        return super().update(instance, validated_data)


class ProgramSerializer(BaseSerializer):
    courses = ProgramCourseSerializer(many=True, read_only=True)

    class Meta:
        model = Program
        fields = ["id", "name", "description", "courses"]
