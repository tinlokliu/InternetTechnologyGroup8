from django.db import models
from django.contrib.auth.models import User

class Recipe(models.Model):
    recipe_ID = models.CharField(max_length=255, primary_key=True)
    recipe_title = models.CharField(max_length=255, null=False)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=255, null=False)
    password = models.CharField(max_length=255, null=False)
    email = models.CharField(max_length=255, null=False)
    recipe_ID = models.ForeignKey(Recipe, on_delete=models.SET_NULL, null=True, blank=True)
