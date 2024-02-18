from django.shortcuts import render

from django.http import HttpResponse

def homepage(request):
    return render(request, 'rango/mainpage.html')

def about(request):
    return render(request, 'rango/about.html')