from django.contrib import admin
from .models import Cohort, Pace
from courses.models import CourseModuleDrip
from tracks.models import TrackCourseDrip


class CourseModuleDripInline(admin.TabularInline):
    model = CourseModuleDrip
    extra = 0


class TrackCourseDripInline(admin.TabularInline):
    model = TrackCourseDrip
    extra = 0


class CohortAdmin(admin.ModelAdmin):
    inlines = [CourseModuleDripInline, TrackCourseDripInline]


admin.site.register(Cohort, CohortAdmin)
admin.site.register(Pace)
