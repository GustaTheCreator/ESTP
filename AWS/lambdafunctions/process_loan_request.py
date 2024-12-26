import boto3
import django
import os

# Setup Django environment to access settings.py
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gbank.settings')
django.setup()

from django.conf import settings

def lambda_handler(event, context):
    loan_request_id = event.get('loan_request_id')
    score = event.get('score')
    decision = event.get('decision')  # Aceitar, Entrevista, Rejeitar
    
     # Atualizando status do pedido de empréstimo (exemplo com DynamoDB)
    dynamodb = boto3.resource(
        'dynamodb',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_REGION_NAME
    )

    table = dynamodb.Table(settings.DYNAMODB_TABLE_NAME)

    
    # Atualiza o status do empréstimo no banco de dados
    table.update_item(
        Key={'loan_request_id': loan_request_id},
        UpdateExpression="set status = :s",
        ExpressionAttributeValues={':s': decision}
    )
    
    # Enviar notificação ao cliente (SMS/Email) - utilizar a função previamente criada
    sns = boto3.client('sns')
    sns.publish(
        PhoneNumber=event.get('phone_number'),
        Message=f"Seu pedido de empréstimo foi {decision}."
    )

    return {
        'statusCode': 200,
        'body': f"Loan request {loan_request_id} processed with decision: {decision}"
    }
