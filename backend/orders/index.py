import json
import os
import psycopg2
from datetime import datetime
from typing import Dict, Any, List, Optional

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления заявками клиентов зоотакси
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с атрибутами: request_id, function_name, function_version, memory_limit_in_mb
    Returns: HTTP response dict с заявками или результатом операции
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Обработка CORS OPTIONS запроса
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'isBase64Encoded': False,
            'body': ''
        }
    
    # Получаем DATABASE_URL из переменных окружения
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'DATABASE_URL не настроен'})
        }
    
    try:
        # Подключение к базе данных
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        
        if method == 'GET':
            # Получение списка заявок
            query_params = event.get('queryStringParameters') or {}
            status_filter = query_params.get('status')
            limit = int(query_params.get('limit', 50))
            offset = int(query_params.get('offset', 0))
            
            # Базовый запрос
            query = """
                SELECT id, client_name, client_phone, client_email, pet_name, pet_type, 
                       pet_breed, pet_weight, pet_special_needs, service_type, 
                       pickup_address, destination_address, preferred_date, preferred_time,
                       additional_services, comments, estimated_price, status,
                       created_at, updated_at
                FROM orders
            """
            params = []
            
            # Добавляем фильтр по статусу
            if status_filter and status_filter != 'all':
                query += " WHERE status = %s"
                params.append(status_filter)
            
            # Сортировка и пагинация
            query += " ORDER BY created_at DESC LIMIT %s OFFSET %s"
            params.extend([limit, offset])
            
            cursor.execute(query, params)
            orders = cursor.fetchall()
            
            # Преобразуем результат в список словарей
            columns = [desc[0] for desc in cursor.description]
            orders_list = []
            for order in orders:
                order_dict = dict(zip(columns, order))
                # Преобразуем datetime объекты в строки
                if order_dict['created_at']:
                    order_dict['created_at'] = order_dict['created_at'].isoformat()
                if order_dict['updated_at']:
                    order_dict['updated_at'] = order_dict['updated_at'].isoformat()
                if order_dict['preferred_date']:
                    order_dict['preferred_date'] = order_dict['preferred_date'].strftime('%Y-%m-%d')
                if order_dict['preferred_time']:
                    order_dict['preferred_time'] = str(order_dict['preferred_time'])
                if order_dict['pet_weight']:
                    order_dict['pet_weight'] = float(order_dict['pet_weight'])
                if order_dict['estimated_price']:
                    order_dict['estimated_price'] = float(order_dict['estimated_price'])
                orders_list.append(order_dict)
            
            # Получаем общее количество заявок для пагинации
            count_query = "SELECT COUNT(*) FROM orders"
            count_params = []
            if status_filter and status_filter != 'all':
                count_query += " WHERE status = %s"
                count_params.append(status_filter)
            
            cursor.execute(count_query, count_params)
            total_count = cursor.fetchone()[0]
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'orders': orders_list,
                    'total': total_count,
                    'limit': limit,
                    'offset': offset
                })
            }
        
        elif method == 'POST':
            # Создание новой заявки
            body_data = json.loads(event.get('body', '{}'))
            
            # Валидация обязательных полей
            required_fields = ['client_name', 'client_phone', 'pet_type', 'service_type', 
                             'pickup_address', 'destination_address', 'preferred_date', 'preferred_time']
            
            for field in required_fields:
                if not body_data.get(field):
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'isBase64Encoded': False,
                        'body': json.dumps({'error': f'Поле {field} обязательно для заполнения'})
                    }
            
            # Вставка новой заявки
            insert_query = """
                INSERT INTO orders (
                    client_name, client_phone, client_email, pet_name, pet_type, pet_breed,
                    pet_weight, pet_special_needs, service_type, pickup_address, 
                    destination_address, preferred_date, preferred_time, additional_services,
                    comments, estimated_price, status
                ) VALUES (
                    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
                ) RETURNING id
            """
            
            cursor.execute(insert_query, [
                body_data.get('client_name'),
                body_data.get('client_phone'),
                body_data.get('client_email'),
                body_data.get('pet_name'),
                body_data.get('pet_type'),
                body_data.get('pet_breed'),
                body_data.get('pet_weight'),
                body_data.get('pet_special_needs'),
                body_data.get('service_type'),
                body_data.get('pickup_address'),
                body_data.get('destination_address'),
                body_data.get('preferred_date'),
                body_data.get('preferred_time'),
                body_data.get('additional_services'),
                body_data.get('comments'),
                body_data.get('estimated_price'),
                'new'  # статус по умолчанию
            ])
            
            new_order_id = cursor.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'id': new_order_id,
                    'message': 'Заявка успешно создана',
                    'status': 'new'
                })
            }
        
        elif method == 'PUT':
            # Обновление заявки (статус и/или цена)
            body_data = json.loads(event.get('body', '{}'))
            order_id = body_data.get('id')
            new_status = body_data.get('status')
            estimated_price = body_data.get('estimated_price')
            
            if not order_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'ID заявки обязателен'})
                }
            
            # Проверяем, что есть хотя бы одно поле для обновления
            if not new_status and estimated_price is None:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'Необходимо указать статус или цену для обновления'})
                }
            
            # Проверяем валидность статуса, если он указан
            if new_status:
                valid_statuses = ['new', 'confirmed', 'in_progress', 'completed', 'cancelled']
                if new_status not in valid_statuses:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'isBase64Encoded': False,
                        'body': json.dumps({'error': 'Некорректный статус'})
                    }
            
            # Формируем динамический запрос обновления
            update_fields = []
            update_params = []
            
            if new_status:
                update_fields.append('status = %s')
                update_params.append(new_status)
            
            if estimated_price is not None:
                update_fields.append('estimated_price = %s')
                update_params.append(estimated_price)
            
            update_fields.append('updated_at = CURRENT_TIMESTAMP')
            update_params.append(order_id)
            
            update_query = f"""
                UPDATE orders 
                SET {', '.join(update_fields)}
                WHERE id = %s
                RETURNING id, status, estimated_price
            """
            
            cursor.execute(update_query, update_params)
            result = cursor.fetchone()
            
            if not result:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'Заявка не найдена'})
                }
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'id': result[0],
                    'status': result[1],
                    'estimated_price': float(result[2]) if result[2] else None,
                    'message': 'Заявка обновлена'
                })
            }
        
        elif method == 'DELETE':
            # Удаление заявки
            query_params = event.get('queryStringParameters') or {}
            order_id = query_params.get('id')
            
            if not order_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'ID заявки обязателен'})
                }
            
            # Удаляем заявку
            delete_query = "DELETE FROM orders WHERE id = %s RETURNING id"
            cursor.execute(delete_query, [order_id])
            result = cursor.fetchone()
            
            if not result:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'Заявка не найдена'})
                }
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'id': result[0],
                    'message': 'Заявка успешно удалена'
                })
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Метод не поддерживается'})
            }
    
    except psycopg2.Error as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': f'Ошибка базы данных: {str(e)}'})
        }
    
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Некорректный JSON в теле запроса'})
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': f'Внутренняя ошибка сервера: {str(e)}'})
        }
    
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()