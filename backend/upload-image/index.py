import json
import base64
import uuid
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Загрузка изображений и возврат публичного URL
    Args: event с httpMethod, body (base64 encoded image); context с request_id
    Returns: HTTP response с URL загруженного изображения
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        
        image_base64 = body_data.get('image')
        filename = body_data.get('filename', 'image.jpg')
        
        if not image_base64:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'image field is required (base64 encoded)'})
            }
        
        # Удаляем префикс data:image/...;base64, если есть
        if ',' in image_base64:
            image_base64 = image_base64.split(',')[1]
        
        # Декодируем base64
        try:
            image_bytes = base64.b64decode(image_base64)
        except Exception as e:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'Invalid base64 image: {str(e)}'})
            }
        
        # Генерируем уникальное имя файла
        file_extension = filename.split('.')[-1] if '.' in filename else 'jpg'
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        
        # В реальном проекте здесь была бы загрузка в S3/Cloud Storage
        # Для демо возвращаем base64 как data URL
        image_url = f"data:image/{file_extension};base64,{image_base64}"
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'url': image_url,
                'filename': unique_filename,
                'size': len(image_bytes)
            })
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': str(e)})
        }
