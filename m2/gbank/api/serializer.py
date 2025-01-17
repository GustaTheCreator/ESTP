#api/serializer.py
from rest_framework import serializers
from base.models import LoanRequest  # Importa LoanRequest do app base
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['id'] = user.id
        token['username'] = user.username
        token['email'] = user.email

        return token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

        def create(self, validated_data):
            user = User(
                username=validated_data['username'],
                email=validated_data['email']
            )
            user.set_password(validated_data['password'])
            user.save()
            return user

class LoanRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanRequest
        fields = ['id', 'amount', 'duration_months', 'status', 'created_at', 'updated_at', 'credit_score', 'user_name', 'interview_needed', 'interview_date', 'deadline']
        read_only_fields = ['user_name']

        def validate_amount(self, value):
            if value <= 0:
                raise serializers.ValidationError("Amount must be a positive value.")
            return value
        
        def validate_deadline(self, value):
            if value and value < timezone.now():
                raise serializers.ValidationError("Deadline cannot be in the past.")
            return value

        
class WorkflowUpdateSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=LoanRequest.STATUS_CHOICES)
    interview_date = serializers.DateTimeField(required=False)
    interview_needed = serializers.BooleanField(required=False)

    def validate_status(self, value):
        if value not in dict(LoanRequest.STATUS_CHOICES):
            raise serializers.ValidationError("Invalid status.")
        return value




    

