from django.contrib import admin
from .models import Cohort, Pace
from courses.models import CourseModuleDrip
from programs.models import ProgramCourseDrip


class CourseModuleDripInline(admin.TabularInline):
    model = CourseModuleDrip
    extra = 0


class ProgramCourseDripInline(admin.TabularInline):
    model = ProgramCourseDrip
    extra = 0


class CohortAdmin(admin.ModelAdmin):
    inlines = [CourseModuleDripInline, ProgramCourseDripInline]


admin.site.register(Cohort, CohortAdmin)
admin.site.register(Pace)
