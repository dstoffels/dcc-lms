from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import PermissionsMixin


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)

    def get_by_natural_key(self, email):
        return self.get(email=email)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, null=True)
    last_name = models.CharField(max_length=150, null=True)
    role = models.ForeignKey("users.Role", on_delete=models.SET_NULL, null=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "email"

    objects = UserManager()


class Role(models.Model):
    name = models.CharField(max_length=255, unique=True)
    can_manage_content = models.BooleanField(default=False)  # Tracks, Courses, Modules, Units
    can_manage_classes = models.BooleanField(default=False)  # Classes/Cohorts
    can_manage_students = models.BooleanField(default=False)  # Student enrollment, grades
    can_manage_admissions = models.BooleanField(default=False)  # Student payments, contact info

    def __str__(self) -> str:
        return self.name
