import json
# import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
import openai
import json
from django.conf import settings
from django.contrib.auth import authenticate, login as auth_login
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import login
from django.contrib import messages
import os
from openai import OpenAI
from chatGPT import ask_openai

def homepage(request):
    return render(request, 'rango/homepage1.html')
def about(request):
    return render(request, 'rango/about.html')

def profile(request):
    return render(request, 'rango/profile.html')

def forgot(request):
    return render(request,'rango/forgot.html' )
def forgot_1(request):
    return render(request,'rango/forgot_1.html' )
def forgot_2(request):
    return render(request,'rango/forgot_2.html' )

def catalogue(request):
    return render(request, 'rango/receipe-catalogue.html')

def detail(request):
    return render(request, 'rango/recipe.html')

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

def userpage(request):
    return render(request, 'rango/userpage.html')

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
