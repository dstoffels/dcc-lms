from django.db import models
from courses.models import Course
from django.conf import settings


class Program(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name


class ProgramCourse(models.Model):
    program = models.ForeignKey(
        Program, on_delete=models.CASCADE, related_name="courses"
    )
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=None, blank=True)
    follows_drip = models.BooleanField(default=True)  # course unlocked if False

    def save(self, *args, **kwargs) -> None:
        if self.pk is None:
            self.order = ProgramCourse.objects.filter(program=self.program).count() + 1
        else:
            original = ProgramCourse.objects.get(pk=self.pk)
            ProgramCourse.objects.filter(program=self.program, order=self.order).update(
                order=original.order
            )

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.program.name}: {self.course.name}"

    class Meta:
        ordering = ["order"]
        unique_together = ["program", "course"]


class ProgramCourseDrip(models.Model):
    """Student Layer"""

    cohort = models.ForeignKey("cohorts.Cohort", on_delete=models.CASCADE)
    program_course = models.ForeignKey(ProgramCourse, on_delete=models.CASCADE)
    date = models.DateField(blank=True, null=True)
    override = models.BooleanField(default=False)


class StudentCourse(models.Model):
    """Allows students to enroll in individual courses already scheduled within an existing cohort, without being associated with the cohort itself."""

    student = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="courses"
    )
    course = models.ForeignKey(ProgramCourseDrip, on_delete=models.PROTECT)

    def __str__(self):
        return f"{self.student.username} - {self.course.name}"

    class Meta:
        unique_together = ["student", "course"]
