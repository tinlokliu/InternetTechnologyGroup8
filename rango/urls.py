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
    path('register/', views.register, name='register'),
    path('forgot/', views.forgot, name='forgot'),
    path('forgot_1/', views.forgot_1, name='forgot_1'),
    path('forgot_2/', views.forgot_2, name='forgot_2'),
    path('ask_openai/', views.ask_openai_view, name='ask_openai_view'),
    path('homepage/', views.homepage, name='homepage'),
    path('detail/', views.detail, name='detail'),
]