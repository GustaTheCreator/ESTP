from django.http import HttpResponse

def home(request):
    return HttpResponse("<h1>Bem-vindo à API do Gbank</h1><p>Use os endpoints /api/login/ ou /api/loan-requests/.</p>")
