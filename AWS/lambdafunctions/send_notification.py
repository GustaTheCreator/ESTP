import boto3

def lambda_handler(event, context):
    sns = boto3.client('sns')
    email = event.get('email')
    phone = event.get('phone')
    status = event.get('status')
    
    # Defina a mensagem dependendo do status
    if status == 'accepted':
        message = "Parabéns! Seu pedido de empréstimo foi aprovado."
    elif status == 'interview':
        message = "Seu pedido de empréstimo requer uma entrevista. Por favor, agende um horário."
    else:
        message = "Seu pedido de empréstimo foi rejeitado."

    # Enviar email (usando SES)
    if email:
        ses = boto3.client('ses')
        ses.send_email(
            Source='your-email@example.com',
            Destination={'ToAddresses': [email]},
            Message={'Subject': {'Data': 'Status do Pedido de Empréstimo'},
                     'Body': {'Text': {'Data': message}}}
        )

    # Enviar SMS (usando SNS)
    if phone:
        sns.publish(
            PhoneNumber=phone,
            Message=message
        )

    return {
        'statusCode': 200,
        'body': 'Notification sent successfully.'
    }
