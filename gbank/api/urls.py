# URL Configuration
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserViewSet, LoanRequestViewSet, login, logout


urlpatterns = [
    path('api/login/', login, name='login'),
    path('api/logout/', logout, name='logout'),
    path('api/', include(router.urls)),
]

