from django.shortcuts import render

from django.http import HttpResponse

def homepage(request):
   ### return HttpResponse("This will be the mainpage for our Cooking Website!")
    return render(request, 'rango/mainpage.html')