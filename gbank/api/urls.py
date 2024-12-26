#api/urls.py
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import LoanRequestViewSet, login, logout, update_loan_status, loan_detail, cancel_loan_request, loan_statistics

router = routers.DefaultRouter()
router.register(r'loan-requests', LoanRequestViewSet, basename='loan-requests')

urlpatterns = [
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('', include(router.urls)),  # Certifique-se de que o roteador está incluído
    path('loan-requests/<int:pk>/update-status/', update_loan_status, name='update-loan-status'),
    path('loan-requests/<int:pk>/', loan_detail, name='loan-detail'),
    path('loan-requests/<int:pk>/cancel/', cancel_loan_request, name='cancel-loan-request'),
    path('loan-requests/statistics/', loan_statistics, name='loan-statistics'),

]
