from collections.abc import Iterable
from django.db import models
from django.conf import settings
from django.db.models import Q
from programs.models import Program
from .utils import calculate_drip_schedule


class Pace(models.Model):
    name = models.CharField(max_length=55)
    hours_per_week = models.PositiveIntegerField(default=40)
    flex_factor = models.FloatField(
        default=1.0
    )  # Flex allotment as percentage of hours per week
    days_per_week = models.PositiveIntegerField(default=5)

    def __str__(self):
        return self.name


class Cohort(models.Model):
    name = models.CharField(max_length=255)
    track = models.ForeignKey(Program, on_delete=models.PROTECT, related_name="cohorts")
    pace = models.ForeignKey(Pace, on_delete=models.PROTECT)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    students = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        blank=True,
        related_name="cohorts",
        limit_choices_to=Q(role__name="Student"),
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
        return f"{self.name}: {self.track.name} - {self.pace.name}"
