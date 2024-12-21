from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserViewSet, LoanRequestViewSet, login, logout

# Roteadores
router = routers.DefaultRouter()
router.register(r'loan-requests', LoanRequestViewSet, basename='loan-requests')

urlpatterns = [
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('', include(router.urls)),  # Apenas '' para não repetir 'api/'
]
