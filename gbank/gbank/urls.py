#gbank/urls.py
from django.contrib import admin
from django.urls import path, include
from .views import home  # Importa a view `home` do arquivo views.py

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Inclui as URLs do app `api`
    path('', home, name='home'),  # Define uma view para a raiz
]
