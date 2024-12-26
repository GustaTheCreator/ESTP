import boto3
import os

def lambda_handler(event, context):
    s3 = boto3.client('s3', region_name='us-east-1')
    bucket_name = event['baldinhos']
    document_key = event['document_key'] # Nome do arquivo no S3
    
    # Baixar o documento do S3
    document = s3.get_object(Bucket=bucket_name, Key=document_key)
    document_content = document['Body'].read()
    
    # Verificar o tipo do arquivo (por exemplo, verificar se é PDF ou imagem)
    if document_key.endswith('.pdf'):
        document_type = 'PDF'
    elif document_key.endswith('.jpg') or document_key.endswith('.png'):
        document_type = 'Image'
    else:
        return {
            'statusCode': 400,
            'body': 'Invalid document type.'
        }

    # Aqui você pode adicionar lógica para verificar conteúdo (usando OCR, por exemplo)
    # Para simplificação, vamos apenas retornar o tipo do documento
    return {
        'statusCode': 200,
        'body': f'Document {document_type} uploaded successfully.'
    }
