from django.db import models
from django.conf import settings


class Unit(models.Model):
    module = models.ForeignKey("modules.Module", on_delete=models.SET_NULL, related_name="units", null=True, blank=True)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255, default="", blank=True)
    order = models.PositiveIntegerField()
    course_hours = models.FloatField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


# class Assessment(Unit):
#     total_marks = models.PositiveIntegerField()
#     passing_marks = models.PositiveIntegerField()


# class Assignment(Unit):
#     due_date = models.DateTimeField()
# url = models.CharField(max_length=255)


class ExternalURL(Unit):
    url = models.URLField()
    load_in_new_tab = models.BooleanField(default=False)


class Lab(Unit):
    due_date = models.DateField(null=True, blank=True)


class LabTask(models.Model):
    lab = models.ForeignKey(Lab, on_delete=models.CASCADE, related_name="tasks")
    order = models.PositiveIntegerField()
    description = models.TextField()
    resources = models.TextField(default="", blank=True)
    language = models.CharField(max_length=255)
    required = models.BooleanField(default=True)
    points = models.PositiveIntegerField(default=0)

    def __str__(self) -> str:
        return f"{self.lab.title}, Task {self.order}"


class CompletedLabTask(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    task = models.ForeignKey(LabTask, on_delete=models.CASCADE)
    completed_at = models.DateTimeField(auto_now_add=True)
