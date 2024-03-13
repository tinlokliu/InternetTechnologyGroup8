from django.urls import path
from rango import views
from rango.views import ask_openai
from . import views
from django.urls import reverse_lazy
from django.conf import settings
from django.urls import include, path
from .views import MyPasswordResetConfirmView
from django.contrib.auth import views as auth_views
app_name = 'rango'




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
    path('password-change/', views.change_password_view, name='change_password_view'),

    path('password_reset/', auth_views.PasswordResetView.as_view(
        template_name=reverse_lazy('rango:forgot'),
        email_template_name='rango/password_reset_email.html',
        success_url=reverse_lazy('rango:forgot_1')), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(
        template_name='rango/forgot_2.html'
    ), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(
        template_name='rango/forgot_2.html'), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(
        template_name='rango/login.html'
    ), name='password_reset_complete'),
    path('reset/<uidb64>/<token>/', MyPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('DeleteAccount/', views.logout_view, name='DeleteAccount'),
]

