import boto3

def lambda_handler(event, context):
    loan_request_id = event.get('loan_request_id')
    score = event.get('score')
    decision = event.get('decision')  # Aceitar, Entrevista, Rejeitar
    
    # Lógica de processamento (exemplo de atualizar status)
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('LoanRequests')
    
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
