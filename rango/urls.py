from django.urls import path
from rango import views
from rango.views import ask_openai

app_name ='rango'

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('about/', views.about, name='about'),
    path('profile/', views.profile, name='profile'),
    path('catalogue/', views.catalogue, name='catalogue'),
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('ask_openai/', ask_openai, name='ask_openai'),
]