from django.contrib import admin
from .models import Course, Tag, CourseModule


class CourseModuleInline(admin.TabularInline):
    model = CourseModule
    extra = 1


class CourseAdmin(admin.ModelAdmin):
    inlines = [CourseModuleInline]


admin.site.register(Course, CourseAdmin)
admin.site.register(Tag)
