from django.db import models
from django.conf import settings
from django.db.models import Q


class Tag(models.Model):
    name = models.CharField(max_length=55)

    def __str__(self) -> str:
        return self.name


from modules.models import Module


class Course(models.Model):
    code = models.CharField(max_length=150)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    prerequisites = models.ManyToManyField("self", symmetrical=False, blank=True)
    modules = models.ManyToManyField(Module, through="CourseModule", blank=True, related_name="courses")
    tags = models.ManyToManyField(Tag, blank=True, related_name="courses")
    is_public = models.BooleanField(default=False)
    is_template = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.code}: {self.title}"


class CourseModule(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="course_modules")
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=None, blank=True)
    follows_drip = models.BooleanField(default=True)  # module unlocked if False

    def save(self, *args, **kwargs) -> None:
        count = CourseModule.objects.filter(course=self.course).count()
        if self.pk is None:
            self.order = count + 1
        else:
            original = CourseModule.objects.get(pk=self.pk)
            if self.order > count:
                self.order = count
            CourseModule.objects.filter(course=self.course, order=self.order).update(order=original.order)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.course.title}: {self.module}"

    class Meta:
        ordering = ["order"]


class CourseModuleDrip(models.Model):
    cohort = models.ForeignKey("cohorts.Cohort", on_delete=models.CASCADE)
    course_module = models.ForeignKey(CourseModule, on_delete=models.CASCADE, related_name="drips")
    date = models.DateField(blank=True, null=True)
    override = models.BooleanField(default=False)
