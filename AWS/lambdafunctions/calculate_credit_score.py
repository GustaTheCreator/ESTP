import json

def lambda_handler(event, context):
    # Dados recebidos no evento (supondo que 'income' e 'expenses' sejam enviados)
    income = event.get('income')
    expenses = event.get('expenses')
    
    # Exemplo de lógica para calcular o score (simples)
    score = (income - expenses) / 100  # Simples cálculo, pode ser alterado conforme necessidade
    
    # Definir a classificação do score de crédito
    if score > 50:
        credit_decision = 'accept'
    elif score > 20:
        credit_decision = 'interview'
    else:
        credit_decision = 'reject'
    
    # Retornar o resultado (score e decisão)
    return {
        'statusCode': 200,
        'body': json.dumps({
            'score': score,
            'decision': credit_decision
        })
    }

