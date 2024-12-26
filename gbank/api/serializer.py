#api/serializer.py
from rest_framework import serializers
from base.models import LoanRequest  # Importa LoanRequest do app base
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import LoanRequestSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class LoanRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanRequest
        fields = ['id', 'amount', 'duration_months', 'status', 'created_at', 'updated_at', 'credit_score', 'user_name']

