from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.

def index(request):
    context = {
        'name': 'Nina',
        'surname': 'SMIRNOVA'
                }
    return render(request, 'index.html', context = context)
