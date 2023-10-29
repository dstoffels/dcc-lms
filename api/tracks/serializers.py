from rest_framework import serializers
from courses.serializers import CourseSerializer
from .models import Track, TrackCourse
from rest_framework.exceptions import ValidationError


class TrackCourseSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    course_id = serializers.IntegerField(write_only=True)
    track_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = TrackCourse
        fields = ["id", "track_id", "course_id", "order", "follows_drip", "course"]

    def update(self, instance, validated_data):
        errors = []

        if "track_id" in validated_data and instance.track_id != validated_data["track_id"]:
            errors.append({"track_id": "This field cannot be modified."})

        if "course_id" in validated_data and instance.course_id != validated_data["course_id"]:
            errors.append({"course_id": "This field cannot be modified."})

        if len(errors) > 0:
            raise ValidationError(errors, code=400)
        return super().update(instance, validated_data)


class TrackSerializer(serializers.ModelSerializer):
    courses = TrackCourseSerializer(many=True, read_only=True)

    class Meta:
        model = Track
        fields = ["id", "name", "description", "courses"]
