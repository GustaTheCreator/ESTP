from django.contrib import admin
from django.urls import path, include
from base.views import home  # Importando a nova view

urlpatterns = [
    path('', home, name='home'),  # Página inicial
    path('admin/', admin.site.urls),
    path('api/', include('gbank.api.urls')),
]
