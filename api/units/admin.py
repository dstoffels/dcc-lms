from django.contrib import admin
from .models import ExternalURL, Lab, LabTask, CompletedLabTask


admin.site.register(ExternalURL)
admin.site.register(Lab)
admin.site.register(LabTask)
admin.site.register(CompletedLabTask)
