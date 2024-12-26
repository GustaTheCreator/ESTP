#gbank/views.py
from django.http import HttpResponse

def home(request):
    return HttpResponse("<h1>Bem-vindo à API do GBank!</h1>")
