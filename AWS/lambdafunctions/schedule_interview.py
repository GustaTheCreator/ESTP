import boto3
import datetime
import django
import os

# Setup Django environment to access settings.py
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gbank.settings')
django.setup()

from django.conf import settings

def lambda_handler(event, context):
    # Extrair dados do evento
    user_id = event.get('user_id')
    available_times = event.get('available_times')  # Lista de horários disponíveis
    
    # Lógica para agendar a entrevista (aqui estamos simulando um agendamento)
    chosen_time = available_times[0]  # Simulando escolha do primeiro horário

    # Aqui você pode integrar com um serviço de calendário real (exemplo: Google Calendar API)
    # Para fins de exemplo, estamos apenas salvando em um banco de dados fictício

    # Simulando resposta de agendamento
    result = f"Entrevista agendada para o {chosen_time}."
    
    # Atualizando status do pedido de empréstimo (exemplo com DynamoDB)
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    
    table_name = settings.DYNAMODB_TABLE_NAME
    table = dynamodb.Table(table_name)

    table.update_item(
        Key={'user_id': user_id},
        UpdateExpression="set interview_time = :t",
        ExpressionAttributeValues={':t': chosen_time}
    )

    return {
        'statusCode': 200,
        'body': result
    }
