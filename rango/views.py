import json

from django.conf import settings
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
# import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
import openai
from django.contrib.auth import authenticate, login as auth_login
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import login

from django.shortcuts import redirect, render
from django.contrib import messages
from django.contrib.auth.models import User
from django.urls import reverse
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.conf import settings
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth import logout
from django.shortcuts import redirect
from django.http import HttpResponse
import os
from openai import OpenAI
from chatGPT import ask_openai
from django.contrib.auth.views import PasswordResetConfirmView
class MyPasswordResetConfirmView(PasswordResetConfirmView):
    template_name = 'rango/forgot_2.html'  # 指定你的自定义模板路径

    def get_context_data(self, **kwargs):
        # 首先，调用父类的 get_context_data 方法获取现有的上下文数据
        context = super().get_context_data(**kwargs)
        # 你可以在这里添加或修改上下文数据
        # 例如，确保 uidb64 和 token 被添加到上下文中（通常这一步是不必要的，因为它们已经由 Django 自动处理）
        context['uidb64'] = self.kwargs.get('uidb64')
        context['token'] = self.kwargs.get('token')
        return context
def homepage(request):
    return render(request, 'rango/homepage1.html')
def about(request):
    return render(request, 'rango/about.html')

def profile(request):
    return render(request, 'rango/profile.html')

def forgot(request):

    return render(request, 'rango/forgot.html')

#
def forgot_1(request):
    return render(request,'rango/forgot_1.html' )
def forgot_2(request):
    return render(request,'rango/forgot_2.html' )

def catalogue(request):
    return render(request, 'rango/receipe-catalogue.html')

def detail(request):
    return render(request, 'rango/detail.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            return redirect('rango:homepage')  # Adjust the namespace and view name as necessary
        else:
            # Return an error message to the login form
            return render(request, 'rango/login.html', {'error': 'Invalid credentials. Please try again.'})
    return render(request, 'rango/login.html')  # Adjust the path to your login template

def signup(request):
    return render(request, 'rango/sign.html')

def register(request):
    
    if request.method == 'POST':

        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        confirm_password = request.POST['confirm']
        
        if password == confirm_password:
            try:
                user = User.objects.create_user(username, email, password)
                user.save()
                login(request, user)  
                return redirect('rango:login')  
            except Exception as e:
                messages.error(request, f"Error creating account: {e}")
        else:
            messages.error(request, "Password and confirm password do not match")
    
    return render(request, 'rango/sign.html', {})

def welcome(request):
    return render(request, 'rango/welcome.html')
def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    print(context['uidb64'])  # 日志打印或设置断点
    print(context['token'])
    return context


@csrf_exempt
def ask_openai_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        question = data.get('question', '')
        print(question)

        answer = ask_openai(question)
        return JsonResponse({'answer': answer})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


def confirm_password_view(request):
    if request.method == "POST":
        email=request.POST['email']
        user=authenticate(email=email)
        if user is not None:
            messages.success(request, 'We have sent you an email to reset your password')
            return render(request, 'rango/forgot_2.html')
        else:
            messages.error(request, "The email address you entered does not exist.")
            return render(request, 'rango/forgot.html')

def change_password_view(request):
    if request.method == "POST":
        form = PasswordChangeForm(request.user,request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Update session to prevent users from being logged out
            messages.success(request, 'Your password was successfully updated!Please login again')
            print("success")
            return redirect('rango:login')
        else:
            messages.error(request, 'Please correct the error below.')
            print("Form invalid")

    else:
        form = PasswordChangeForm(request.user)
        print("Processing non-POST requests")
    return render(request, 'rango/password_change.html', {
        'form': form
    })


# def logout_view(request):
#     logout(request)
#     return redirect('rango:welcome')
def logout_view(request):
    if request.user.is_authenticated:
        # Gets the currently logged in user object象
        user = request.user
        user.is_active = False
        user.save()
        # Log out of the user and end the user session
        logout(request)
        return redirect('rango:welcome')
    else:
        # If no user is logged in, return an error or redirect to the login page
        return HttpResponse("You are not logged in.", status=401)