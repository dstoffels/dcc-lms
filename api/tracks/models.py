from django.db import models
from courses.models import Course


class Track(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name


class TrackCourse(models.Model):
    track = models.ForeignKey(Track, on_delete=models.CASCADE, related_name="courses")
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=None, blank=True)
    follows_drip = models.BooleanField(default=True)  # course unlocked if False

    def save(self, *args, **kwargs) -> None:
        if self.pk is None:
            self.order = TrackCourse.objects.filter(track=self.track).count() + 1
        else:
            original = TrackCourse.objects.get(pk=self.pk)
            TrackCourse.objects.filter(track=self.track, order=self.order).update(order=original.order)

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.track.name}: {self.course.name}"

    class Meta:
        ordering = ["order"]
        unique_together = ["track", "course"]


class TrackCourseDrip(models.Model):
    cohort = models.ForeignKey("cohorts.Cohort", on_delete=models.CASCADE)
    track_course = models.ForeignKey(TrackCourse, on_delete=models.CASCADE, related_name="start_date")
    date = models.DateField(blank=True, null=True)
    override = models.BooleanField(default=False)
