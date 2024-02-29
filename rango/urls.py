from django.urls import path
from rango import views

app_name ='rango'

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('about/', views.about, name='about'),
    path('api/openai/', views.openai_api, name='openai_api'),
]