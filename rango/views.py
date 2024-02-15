from django.shortcuts import render

from django.http import HttpResponse

def mainpage(request):
    return HttpResponse("This will be the mainpage for our Cooking Website!")
