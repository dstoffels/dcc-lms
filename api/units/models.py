from django.db import models


class Unit(models.Model):
    module = models.ForeignKey("modules.Module", on_delete=models.CASCADE, related_name="units", blank=True)
    name = models.CharField(max_length=255)
    order = models.PositiveIntegerField(blank=True)
    follows_drip = models.BooleanField(default=True)

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

    type = models.CharField(max_length=50, choices=UNIT_TYPE_CHOICES)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name


class UnitType(models.Model):
    unit = models.OneToOneField(Unit, on_delete=models.CASCADE, primary_key=True)

    def __str__(self) -> str:
        return f" {self.unit.name}"


class ExternalURL(UnitType):
    url = models.URLField()
    load_in_new_tab = models.BooleanField(default=False)
