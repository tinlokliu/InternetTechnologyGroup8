import json
# import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render

def homepage(request):
    return render(request, 'rango/homepage1.html')

def about(request):
    return render(request, 'rango/about.html')

def profile(request):
    return render(request, 'rango/profile.html')

@csrf_exempt
def openai_api(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        question = data.get('question', '')
        
        # Make a request to the OpenAI API
        openai_response = openai_request(question)

        # Return the response to the frontend
        return JsonResponse({'response': openai_response})

    return JsonResponse({'error': 'Invalid request method'})

def openai_request(question):
    # Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
    }
    data = {
        'prompt': question,
        'max_tokens': 150,
    }
    response = requests.post('https://api.openai.com/v1/completions', headers=headers, json=data)
    if response.status_code == 200:
        return response.json()['choices'][0]['text']
    else:
        return f"Error: {response.status_code} - {response.text}"
