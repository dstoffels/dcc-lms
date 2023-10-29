from django.db import models
from django.conf import settings


class Unit(models.Model):
    module = models.ForeignKey("modules.Module", on_delete=models.SET_NULL, related_name="units", null=True, blank=True)
    name = models.CharField(max_length=255)
    order = models.PositiveIntegerField(blank=True)

    def save(self, *args, **kwargs) -> None:
        count = Unit.objects.filter(module=self.module).count()
        if self.pk is None:
            self.order = count + 1
        else:
            original = Unit.objects.get(pk=self.pk)
            if self.order > count:
                self.order = count
            Unit.objects.filter(module=self.module, order=self.order).update(order=original.order)
        super().save(*args, **kwargs)

    UNIT_TYPE_CHOICES = [
        ("external_url", "External URL"),
        ("lab", "Lab"),
        ("assignment", "Assignment"),
    ]

    type = models.CharField(max_length=50, choices=UNIT_TYPE_CHOICES, default="external_url")

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name


class UnitType(models.Model):
    unit = models.OneToOneField(Unit, on_delete=models.CASCADE, primary_key=True)


class ExternalURL(UnitType):
    url = models.URLField()
    load_in_new_tab = models.BooleanField(default=False)


class Lab(UnitType):
    due_date = models.DateField(null=True, blank=True)
    points = models.PositiveIntegerField(default=0)


class LabTask(models.Model):
    lab = models.ForeignKey(Lab, on_delete=models.CASCADE, related_name="tasks")
    order = models.PositiveIntegerField()
    description = models.TextField()
    resources = models.TextField(default="", blank=True)
    language = models.CharField(max_length=255)
    required = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f"{self.lab.name}, Task {self.order}"


class CompletedLabTask(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    task = models.ForeignKey(LabTask, on_delete=models.CASCADE)
    completed_at = models.DateTimeField(auto_now_add=True)
