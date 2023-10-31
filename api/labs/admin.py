from django.contrib import admin
from .models import Lab, LabTask, LabTaskAttempt

admin.site.register(Lab)
admin.site.register(LabTask)
admin.site.register(LabTaskAttempt)
