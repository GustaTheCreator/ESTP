#api/views.py
from rest_framework import viewsets, routers
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from base.models import LoanRequest  # Certifique-se de que LoanRequest está em base.models
from django.contrib.auth.models import User
from api.serializer import UserSerializer, LoanRequestSerializer  # Ajuste o caminho
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import permission_classes
import boto3, os, base64
from django.conf import settings

class LoanRequestViewSet(viewsets.ModelViewSet):
    queryset = LoanRequest.objects.all()
    serializer_class = LoanRequestSerializer
    permission_classes = [IsAuthenticated]
    Pagination_class = PageNumberPagination

    permission_classes_by_action = {
    'list': [IsAuthenticated],
    'create': [IsAuthenticated],
    'update': [IsAdminUser],
    'destroy': [IsAdminUser],
    }

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]

    def get_queryset(self):
        if self.request.user.is_staff:
            return LoanRequest.objects.all()
        return LoanRequest.objects.filter(user=self.request.user)
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        data = request.data
        if float(data['amount']) <= 0 or int(data['duration_months']) <= 0:
            return Response({'error': 'Amount and duration must be positive values'}, status=400)
        data['user'] = request.user.id  # Associa automaticamente o usuário autenticado
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=201)


# JWT Authentication Endpoints
@api_view(['POST'])
@permission_classes([AllowAny])
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
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data.get('refresh_token')
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({'message': 'Logged out successfully.'})
    except Exception as e:
        return Response({'error': str(e)}, status=400)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=201)
    
    
@api_view(['PATCH'])
@permission_classes([IsAdminUser])
def update_loan_status(request, pk):
    try:
        loan_request = LoanRequest.objects.get(pk=pk)
        if not request.user.is_staff:
            return Response({'error': 'Permission denied'}, status=403)
        
        new_status = request.data.get('status')
        if new_status not in ['pending', 'approved', 'rejected']:
            return Response({'error': 'Invalid status'}, status=400)

        loan_request.status = new_status
        loan_request.save()
        return Response({'message': 'Status updated successfully.'})
    except LoanRequest.DoesNotExist:
        return Response({'error': 'Loan request not found'}, status=404)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def loan_detail(request, pk):
    try:
        loan_request = LoanRequest.objects.get(pk=pk, user=request.user)
        serializer = LoanRequestSerializer(loan_request)
        return Response(serializer.data)
    except LoanRequest.DoesNotExist:
        return Response({'error': 'Loan request not found'}, status=404)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def cancel_loan_request(request, pk):
    try:
        loan_request = LoanRequest.objects.get(pk=pk, user=request.user, status='pending')
        loan_request.delete()
        return Response({'message': 'Loan request canceled successfully.'})
    except LoanRequest.DoesNotExist:
        return Response({'error': 'Loan request not found or cannot be canceled'}, status=404)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def loan_statistics(request):
    if not request.user.is_staff:
        return Response({'error': 'Permission denied'}, status=403)

    statistics = {
        'total': LoanRequest.objects.count(),
        'pending': LoanRequest.objects.filter(status='pending').count(),
        'approved': LoanRequest.objects.filter(status='approved').count(),
        'rejected': LoanRequest.objects.filter(status='rejected').count(),
    }
    return Response(statistics)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_workflow(request, pk):
    try:
        loan_request = LoanRequest.objects.get(pk=pk, user=request.user)
        # Chamar a AWS Step Functions aqui e salvar o workflow_id
        loan_request.workflow_id = "workflow-id-example"
        loan_request.save()
        return Response({'message': 'Workflow started', 'workflow_id': loan_request.workflow_id})
    except LoanRequest.DoesNotExist:
        return Response({'error': 'Loan request not found'}, status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def faceRecognition(request):
    rekognition = boto3.client(
        'rekognition',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        aws_session_token=settings.AWS_SESSION_TOKEN,
        region_name=settings.AWS_REGION
    )

    s3 = boto3.resource(
        's3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        aws_session_token=settings.AWS_SESSION_TOKEN,
        region_name=settings.AWS_REGION
    )


    bucket = settings.AWS_STORAGE_BUCKET_NAME
    target = request.data.get('img')

    authorized = False

    for i in bucket.objects.all():
        path, filename = os.path.split(i.key)
        img = bucket.Object(filename)
        
        resp = rekognition.compare_faces(
            SimilarityThreshold=75,
            SourceImage={'Bytes': img.get()['Body'].read()},
            TargetImage={'Bytes': base64.b64decode(target)}
        )
        
        for match in resp['FaceMatches']:
            authorized = True
            break
        
        if authorized:
            break
            
    if authorized:
        return Response({'AUTH': True, 'message': 'Face recognized.'}, status=200)
    else:
        return Response({'AUTH': False, 'error': 'Face not recognized.'}, status=401)


# Routers
router = routers.DefaultRouter()
router.register(r'loan-requests', LoanRequestViewSet, basename='loan-requests')