from rest_framework import viewsets, routers
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from base.models import LoanRequest  # Certifique-se de que LoanRequest está em base.models
from django.contrib.auth.models import User
from api.serializer import UserSerializer, LoanRequestSerializer  # Ajuste o caminho


# ViewSets


class LoanRequestViewSet(viewsets.ModelViewSet):
    queryset = LoanRequest.objects.all()
    serializer_class = LoanRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return LoanRequest.objects.all()
        return LoanRequest.objects.filter(user=self.request.user)

# JWT Authentication Endpoints
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = User.objects.filter(username=username).first()
    if user and user.check_password(password):
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    return Response({'error': 'Invalid credentials'}, status=400)

@api_view(['POST'])
def logout(request):
    try:
        refresh_token = request.data.get('refresh_token')
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({'message': 'Logged out successfully.'})
    except Exception as e:
        return Response({'error': str(e)}, status=400)

# Routers
router = routers.DefaultRouter()
router.register(r'loan-requests', LoanRequestViewSet, basename='loan-requests')