from rest_framework import serializers
from courses.serializers import CourseSerializer
from .models import Track, TrackCourse


class TrackCourseSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    course_id = serializers.IntegerField(write_only=True)
    track_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = TrackCourse
        fields = ["id", "track_id", "course_id", "course", "order", "follows_drip"]


class TrackSerializer(serializers.ModelSerializer):
    courses = TrackCourseSerializer(many=True, read_only=True)

    class Meta:
        model = Track
        fields = ["id", "name", "description", "courses"]
