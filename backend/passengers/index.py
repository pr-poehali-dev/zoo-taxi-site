import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Управление галереей фото пассажиров (питомцев)
    Args: event с httpMethod, body, queryStringParameters; context с request_id
    Returns: HTTP response с данными или статусом операции
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'DATABASE_URL not configured'})
        }
    
    try:
        conn = psycopg2.connect(dsn)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            published_only = params.get('published', 'false').lower() == 'true'
            
            if published_only:
                cur.execute('''
                    SELECT id, pet_name, pet_type, photo_url, description, is_published, created_at
                    FROM passengers_gallery
                    WHERE is_published = true
                    ORDER BY created_at DESC
                ''')
            else:
                cur.execute('''
                    SELECT id, pet_name, pet_type, photo_url, description, is_published, created_at
                    FROM passengers_gallery
                    ORDER BY created_at DESC
                ''')
            
            passengers = cur.fetchall()
            result = []
            for p in passengers:
                result.append({
                    'id': p['id'],
                    'pet_name': p['pet_name'],
                    'pet_type': p['pet_type'],
                    'photo_url': p['photo_url'],
                    'description': p['description'],
                    'is_published': p['is_published'],
                    'created_at': p['created_at'].isoformat() if p['created_at'] else None
                })
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps(result)
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            pet_name = body_data.get('pet_name', '')
            pet_type = body_data.get('pet_type', '')
            photo_url = body_data.get('photo_url', '')
            description = body_data.get('description', '')
            is_published = body_data.get('is_published', False)
            
            if not photo_url:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'photo_url is required'})
                }
            
            cur.execute('''
                INSERT INTO passengers_gallery (pet_name, pet_type, photo_url, description, is_published)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id
            ''', (pet_name, pet_type, photo_url, description, is_published))
            
            new_id = cur.fetchone()['id']
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'id': new_id, 'message': 'Passenger added successfully'})
            }
        
        elif method == 'PUT':
            params = event.get('queryStringParameters') or {}
            passenger_id = params.get('id')
            
            if not passenger_id:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'id parameter is required'})
                }
            
            body_data = json.loads(event.get('body', '{}'))
            
            pet_name = body_data.get('pet_name')
            pet_type = body_data.get('pet_type')
            photo_url = body_data.get('photo_url')
            description = body_data.get('description')
            is_published = body_data.get('is_published')
            
            update_fields = []
            values = []
            
            if pet_name is not None:
                update_fields.append('pet_name = %s')
                values.append(pet_name)
            if pet_type is not None:
                update_fields.append('pet_type = %s')
                values.append(pet_type)
            if photo_url is not None:
                update_fields.append('photo_url = %s')
                values.append(photo_url)
            if description is not None:
                update_fields.append('description = %s')
                values.append(description)
            if is_published is not None:
                update_fields.append('is_published = %s')
                values.append(is_published)
            
            update_fields.append('updated_at = CURRENT_TIMESTAMP')
            values.append(int(passenger_id))
            
            query = f"UPDATE passengers_gallery SET {', '.join(update_fields)} WHERE id = %s"
            cur.execute(query, values)
            conn.commit()
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'message': 'Passenger updated successfully'})
            }
        
        elif method == 'DELETE':
            params = event.get('queryStringParameters') or {}
            passenger_id = params.get('id')
            
            if not passenger_id:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'id parameter is required'})
                }
            
            cur.execute('DELETE FROM passengers_gallery WHERE id = %s', (int(passenger_id),))
            conn.commit()
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'message': 'Passenger deleted successfully'})
            }
        
        else:
            cur.close()
            conn.close()
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'})
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': str(e)})
        }
