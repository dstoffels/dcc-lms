from django.db import models
from units.models import UnitType
from django.conf import settings


class Lab(UnitType):
    due_date = models.DateField(null=True, blank=True)
    points = models.PositiveIntegerField(default=0)


class LabTask(models.Model):
    LANGUAGE_CHOICES = [
        ("python", "Python"),
        ("javascript", "JavaScript"),
        ("c#", "C#"),
    ]

    lab = models.ForeignKey(Lab, on_delete=models.CASCADE, related_name="tasks")
    order = models.PositiveIntegerField(blank=True)
    description = models.TextField()
    resources = models.TextField(default="", blank=True)
    language = models.CharField(max_length=255, choices=LANGUAGE_CHOICES)
    required = models.BooleanField(default=True)  # remove me??

    def save(self, *args, **kwargs) -> None:
        count = LabTask.objects.filter(lab=self.lab).count()
        if self.pk is None:
            self.order = count + 1
        else:
            original = LabTask.objects.get(pk=self.pk)
            if self.order > count:
                self.order = count
            LabTask.objects.filter(lab=self.lab, order=self.order).update(order=original.order)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.lab.unit.name}: Task {self.order}"


class LabTaskAttempt(models.Model):
    task = models.ForeignKey(LabTask, on_delete=models.CASCADE)
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="lab_task_attempts")
    code = models.TextField(blank=True, default="")
    messages = models.JSONField(default=list, blank=True)
    hint = models.TextField(blank=True, default="")
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_complete = models.BooleanField(default=False)

    class Meta:
        unique_together = "task", "student"

    def __str__(self) -> str:
        return f"{self.task.lab.unit.name} Task {self.task.order}: ({self.student})"
