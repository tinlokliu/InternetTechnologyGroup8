import json
# import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
import openai

def homepage(request):
    return render(request, 'rango/homepage1.html')
def about(request):
    return render(request, 'rango/about.html')

def profile(request):
    return render(request, 'rango/profile.html')

def catalogue(request):
    return render(request, 'rango/receipe-catalogue.html')

def login(request):
    return render(request, 'rango/login.html')

def signup(request):
    return render(request, 'rango/login.html')

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