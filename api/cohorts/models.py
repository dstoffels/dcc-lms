from collections.abc import Iterable
from django.db import models
from django.conf import settings
from django.db.models import Q
from programs.models import Program
from .utils import calculate_drip_schedule
from programs.models import ProgramCourse
from courses.models import CourseModule


class Pace(models.Model):
    name = models.CharField(max_length=55)
    hours_per_week = models.PositiveIntegerField(default=40)
    # Flex allotment as percentage of hours per week
    flex_factor = models.FloatField(default=1.0)
    days_per_week = models.PositiveIntegerField(default=5)

    def __str__(self):
        return self.name


class Cohort(models.Model):
    name = models.CharField(max_length=255)
    program = models.ForeignKey(
        Program, on_delete=models.PROTECT, related_name="cohorts"
    )
    pace = models.ForeignKey(Pace, on_delete=models.PROTECT)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    students = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True, related_name="cohorts"
    )
    course_gap_days = models.PositiveIntegerField(default=7)

    def save(self, *args, **kwargs):
        prev_start = None
        if self.pk is not None:
            prev_start = Cohort.objects.get(pk=self.pk).start_date
        super().save(*args, **kwargs)

        if prev_start != self.start_date:
            calculate_drip_schedule(self)

    def __str__(self) -> str:
        return f"{self.name}: {self.program.name} - {self.pace.name}"


class CohortCourse(models.Model):
    """Student Layer"""

    cohort = models.ForeignKey(
        "cohorts.Cohort", on_delete=models.CASCADE, related_name="courses"
    )
    program_course = models.ForeignKey(ProgramCourse, on_delete=models.CASCADE)
    date = models.DateField(blank=True, null=True)
    override = models.BooleanField(default=False)


class CohortModule(models.Model):
    cohort_course = models.ForeignKey(
        CohortCourse, on_delete=models.CASCADE, related_name="modules"
    )
    course_module = models.ForeignKey(CourseModule, on_delete=models.CASCADE)
    date = models.DateField(blank=True, null=True)
    override = models.BooleanField(default=False)
