from rest_framework import serializers
from CORE.serializers import BaseSerializer
from programs.serializers import ProgramSerializerBase
from .models import Pace, Cohort, CohortCourse, CohortModule
from rest_framework.exceptions import ValidationError
from users.serializers import UserSerializer
from units.serializers import UnitSerializer


class PaceSerializer(BaseSerializer):
    class Meta:
        model = Pace
        fields = "__all__"


class CohortModuleSerializer(BaseSerializer):
    class Meta:
        model = CohortModule
        fields = (
            "id",
            "date",
            "override",
            "order",
            "follows_drip",
            "module_id",
            "name",
            "description",
            "course_hours",
            "is_published",
            "units",
        )
        depth = 3

    order = serializers.IntegerField(source="course_module.order")
    follows_drip = serializers.BooleanField(source="course_module.follows_drip")
    module_id = serializers.IntegerField(source="course_module.module.id")
    name = serializers.CharField(source="course_module.module.name")
    description = serializers.CharField(source="course_module.module.description")
    course_hours = serializers.IntegerField(source="course_module.module.course_hours")
    is_published = serializers.BooleanField(source="course_module.module.is_published")
    units = UnitSerializer(
        many=True, read_only=True, source="course_module.module.units"
    )


cohort_course_fields = (
    "id",
    "date",
    "override",
    "cohort_id",
    "order",
    "follows_drip",
    "course_id",
    "name",
    "code",
    "description",
    "is_public",
    "is_published",
    # "is_archived",
    # "can_self_enroll",
)


class CohortCourseSerializerBase(BaseSerializer):
    class Meta:
        model = CohortCourse
        fields = cohort_course_fields

    order = serializers.IntegerField(source="program_course.order")
    follows_drip = serializers.BooleanField(source="program_course.follows_drip")
    course_id = serializers.IntegerField(source="program_course.course.id")
    code = serializers.CharField(source="program_course.course.code")
    name = serializers.CharField(source="program_course.course.name")
    description = serializers.CharField(source="program_course.course.description")
    is_public = serializers.BooleanField(source="program_course.course.is_public")
    # is_template = serializers.BooleanField(source="program_course.is_template")
    is_published = serializers.BooleanField(source="program_course.course.is_published")
    # is_archived = serializers.BooleanField(source="program_course.course.is_archived")
    # can_self_enroll = serializers.BooleanField(
    #     source="program_course.course.can_self_enroll"
    # )


class CohortCourseSerializer(CohortCourseSerializerBase):
    class Meta:
        model = CohortCourse
        fields = (*cohort_course_fields, "modules", "students")

    modules = CohortModuleSerializer(many=True, read_only=True)

    students = serializers.SerializerMethodField()

    def get_students(self, instance: CohortCourse):
        return UserSerializer(instance.cohort.students, many=True).data


class CohortSerializer(BaseSerializer):
    program_id = serializers.IntegerField(write_only=True)
    program = ProgramSerializerBase(read_only=True)

    pace_id = serializers.IntegerField(write_only=True)
    pace = PaceSerializer(read_only=True)

    students = UserSerializer(many=True, read_only=True)

    courses = CohortCourseSerializerBase(many=True, read_only=True)

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
            "courses",
        )
        depth = 1
