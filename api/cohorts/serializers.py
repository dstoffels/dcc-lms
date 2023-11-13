from rest_framework import serializers
from CORE.serializers import BaseSerializer
from programs.serializers import ProgramSerializer
from .models import Pace, Cohort
from rest_framework.exceptions import ValidationError


class PaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pace
        fields = "__all__"


class CohortSerializer(serializers.ModelSerializer):
    program_id = serializers.IntegerField(write_only=True)
    program = ProgramSerializer(read_only=True)

    pace_id = serializers.IntegerField(write_only=True)
    pace = PaceSerializer(read_only=True)

    class Meta:
        model = Cohort
        fields = (
            "id",
            "name",
            "start_date",
            "end_date",
            "course_gap_days",
            "pace",
            "students",
            "program",
            "pace_id",
            "program_id",
        )
        depth = 1
