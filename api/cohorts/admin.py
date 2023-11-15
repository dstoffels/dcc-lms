from django.contrib import admin
from .models import Cohort, Pace

# from courses.models import CourseModuleDrip
from cohorts.models import CohortModule, CohortCourse


class CohortModuleInline(admin.TabularInline):
    model = CohortModule
    extra = 0


class CohortCourseInline(admin.TabularInline):
    model = CohortCourse
    extra = 0


class CohortAdmin(admin.ModelAdmin):
    inlines = [CohortCourseInline]


class CohortCourseAdmin(admin.ModelAdmin):
    inlines = [CohortModuleInline]


admin.site.register(Cohort, CohortAdmin)
admin.site.register(Pace)
admin.site.register(CohortCourse, CohortCourseAdmin)
