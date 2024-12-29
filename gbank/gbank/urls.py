#gbank/urls.py
from django.urls import path, include
from .views import home  # Importa a view `home` do arquivo views.py
from django.conf import settings
from django.contrib import admin
from django.urls import path,include
from django.conf.urls.static import static
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Inclui as URLs do app `api`
    path('robots.txt', TemplateView.as_view(template_name="robots.txt", content_type="text/plain"), name="robots_file"),
    path("", TemplateView.as_view(template_name='index.html')),
    path('login/', TemplateView.as_view(template_name='index.html')),
    path('register/', TemplateView.as_view(template_name='index.html')),
    path('loan-requests/', TemplateView.as_view(template_name='index.html')),
    path('loan-status/', TemplateView.as_view(template_name='index.html')),
    path('loan-details/<int:id>/', TemplateView.as_view(template_name='index.html')),
    path('loan-requests-manager/', TemplateView.as_view(template_name='index.html')),
    path('loan-simulator/', TemplateView.as_view(template_name='index.html')),
    path('interview-scheduler/', TemplateView.as_view(template_name='index.html')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
