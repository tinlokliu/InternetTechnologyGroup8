import json
# import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
import openai
from django.contrib.auth import authenticate, login as auth_login
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required

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

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
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

def welcome(request):
    return render(request, 'rango/welcome.html')

@csrf_exempt
def ask_openai(request):
    if request.method == "POST":
        question = json.loads(request.body).get('question', '')
        openai.api_key = settings.OPENAI_API_KEY

        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=question,
            temperature=0.7,
            max_tokens=150,
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0
        )
        return JsonResponse({'answer': response.choices[0].text.strip()})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)