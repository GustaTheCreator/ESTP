from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import LoanRequestViewSet, login, logout  # Ajuste o caminho

router = routers.DefaultRouter()
router.register(r'loan-requests', LoanRequestViewSet, basename='loan-requests')

urlpatterns = [
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('', include(router.urls)),  # Certifique-se de que o roteador está incluído
]
