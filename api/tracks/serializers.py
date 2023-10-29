from rest_framework import serializers
from courses.serializers import CourseSerializer
from .models import Track, TrackCourse


class TrackCourseSerializer(serializers.ModelSerializer):
    course = CourseSerializer()

    class Meta:
        model = TrackCourse
        fields = ["id", "track", "course", "order", "follows_drip"]


class TrackSerializer(serializers.ModelSerializer):
    courses = TrackCourseSerializer(many=True, read_only=True)

    class Meta:
        model = Track
        fields = ["id", "name", "description", "courses"]
