from django.contrib import admin

# Register your models here.
from rango.models import UserProfile, Recipe

admin.site.register(UserProfile)
admin.site.register(Recipe)