from django.urls import path
from rango import views
from rango.views import ask_openai
from . import views

app_name ='rango'

urlpatterns = [
    path('', views.welcome, name='welcome'),
    path('about/', views.about, name='about'),
    path('profile/', views.profile, name='profile'),
    path('catalogue/', views.catalogue, name='catalogue'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup, name='signup'),
    path('ask_openai/', ask_openai, name='ask_openai'),
    path('homepage/', views.homepage, name='homepage'),
]