import json
import os
import psycopg2
from datetime import datetime
from typing import Dict, Any, List, Optional

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления отзывами клиентов зоотакси
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с атрибутами: request_id, function_name, function_version, memory_limit_in_mb
    Returns: HTTP response dict с отзывами или результатом операции
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
            'body': '',
            'isBase64Encoded': False
        }
    
    # Получаем DATABASE_URL из переменных окружения
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'DATABASE_URL не настроен'}),
            'isBase64Encoded': False
        }
    
    try:
        # Подключение к базе данных
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        
        if method == 'GET':
            # Получение списка отзывов
            query_params = event.get('queryStringParameters') or {}
            status_filter = query_params.get('status', 'all')
            limit = int(query_params.get('limit', 50))
            offset = int(query_params.get('offset', 0))
            public_only = query_params.get('public_only', 'false').lower() == 'true'
            
            # Базовый запрос
            query = """
                SELECT id, client_name, client_email, client_phone, rating, title, content,
                       service_type, trip_date, is_published, is_featured, moderator_notes,
                       admin_reply, reply_author, replied_at,
                       created_at, published_at, updated_at
                FROM reviews
            """
            params = []
            conditions = []
            
            # Добавляем фильтры
            if public_only:
                conditions.append("is_published = true")
            elif status_filter == 'published':
                conditions.append("is_published = true")
            elif status_filter == 'unpublished':
                conditions.append("is_published = false")
            elif status_filter == 'featured':
                conditions.append("is_featured = true")
            
            if conditions:
                query += " WHERE " + " AND ".join(conditions)
            
            # Сортировка и пагинация
            if public_only or status_filter == 'featured':
                query += " ORDER BY is_featured DESC, created_at DESC"
            else:
                query += " ORDER BY created_at DESC"
            
            query += " LIMIT %s OFFSET %s"
            params.extend([limit, offset])
            
            cursor.execute(query, params)
            reviews = cursor.fetchall()
            
            # Преобразуем результат в список словарей
            columns = [desc[0] for desc in cursor.description]
            reviews_list = []
            for review in reviews:
                review_dict = dict(zip(columns, review))
                # Преобразуем datetime объекты в строки
                if review_dict['created_at']:
                    review_dict['created_at'] = review_dict['created_at'].isoformat()
                if review_dict['updated_at']:
                    review_dict['updated_at'] = review_dict['updated_at'].isoformat()
                if review_dict['published_at']:
                    review_dict['published_at'] = review_dict['published_at'].isoformat()
                if review_dict['replied_at']:
                    review_dict['replied_at'] = review_dict['replied_at'].isoformat()
                if review_dict['trip_date']:
                    review_dict['trip_date'] = review_dict['trip_date'].strftime('%Y-%m-%d')
                reviews_list.append(review_dict)
            
            # Получаем общее количество отзывов для пагинации
            count_query = "SELECT COUNT(*) FROM reviews"
            count_conditions = []
            count_params = []
            
            if public_only:
                count_conditions.append("is_published = true")
            elif status_filter == 'published':
                count_conditions.append("is_published = true")
            elif status_filter == 'unpublished':
                count_conditions.append("is_published = false")
            elif status_filter == 'featured':
                count_conditions.append("is_featured = true")
            
            if count_conditions:
                count_query += " WHERE " + " AND ".join(count_conditions)
            
            cursor.execute(count_query, count_params)
            total_count = cursor.fetchone()[0]
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'reviews': reviews_list,
                    'total': total_count,
                    'limit': limit,
                    'offset': offset
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            # Создание нового отзыва
            body_data = json.loads(event.get('body', '{}'))
            
            # Валидация обязательных полей
            required_fields = ['client_name', 'rating', 'content']
            
            for field in required_fields:
                if not body_data.get(field):
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': f'Поле {field} обязательно для заполнения'}),
                        'isBase64Encoded': False
                    }
            
            # Проверяем валидность рейтинга
            rating = body_data.get('rating')
            if not isinstance(rating, int) or rating < 1 or rating > 5:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Рейтинг должен быть числом от 1 до 5'}),
                    'isBase64Encoded': False
                }
            
            # Вставка нового отзыва
            insert_query = """
                INSERT INTO reviews (
                    client_name, client_email, client_phone, rating, title, content,
                    service_type, trip_date, is_published, is_featured, moderator_notes
                ) VALUES (
                    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
                ) RETURNING id
            """
            
            cursor.execute(insert_query, [
                body_data.get('client_name'),
                body_data.get('client_email'),
                body_data.get('client_phone'),
                body_data.get('rating'),
                body_data.get('title'),
                body_data.get('content'),
                body_data.get('service_type'),
                body_data.get('trip_date'),
                False,  # по умолчанию не публикуется
                False,  # по умолчанию не рекомендуемый
                body_data.get('moderator_notes')
            ])
            
            new_review_id = cursor.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'id': new_review_id,
                    'message': 'Отзыв успешно создан',
                    'is_published': False
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            # Обновление отзыва (публикация, модерация и т.д.)
            body_data = json.loads(event.get('body', '{}'))
            review_id = body_data.get('id')
            
            if not review_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'ID отзыва обязателен'})
                }
            
            # Собираем поля для обновления
            update_fields = []
            params = []
            
            if 'is_published' in body_data:
                update_fields.append("is_published = %s")
                params.append(body_data['is_published'])
                if body_data['is_published']:
                    update_fields.append("published_at = CURRENT_TIMESTAMP")
                else:
                    update_fields.append("published_at = NULL")
            
            if 'is_featured' in body_data:
                update_fields.append("is_featured = %s")
                params.append(body_data['is_featured'])
            
            if 'moderator_notes' in body_data:
                update_fields.append("moderator_notes = %s")
                params.append(body_data['moderator_notes'])
            
            if 'admin_reply' in body_data:
                update_fields.append("admin_reply = %s")
                params.append(body_data['admin_reply'])
                if body_data['admin_reply']:
                    update_fields.append("replied_at = CURRENT_TIMESTAMP")
                    if 'reply_author' in body_data:
                        update_fields.append("reply_author = %s")
                        params.append(body_data['reply_author'])
            
            if not update_fields:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Нет полей для обновления'}),
                    'isBase64Encoded': False
                }
            
            # Добавляем updated_at
            update_fields.append("updated_at = CURRENT_TIMESTAMP")
            params.append(review_id)
            
            # Обновляем отзыв
            update_query = f"""
                UPDATE reviews 
                SET {', '.join(update_fields)}
                WHERE id = %s
                RETURNING id, is_published, is_featured, admin_reply, reply_author, replied_at
            """
            
            cursor.execute(update_query, params)
            result = cursor.fetchone()
            
            if not result:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Отзыв не найден'})
                }
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'id': result[0],
                    'is_published': result[1],
                    'is_featured': result[2],
                    'admin_reply': result[3],
                    'reply_author': result[4],
                    'replied_at': result[5].isoformat() if result[5] else None,
                    'message': 'Отзыв обновлен'
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'DELETE':
            # Удаление отзыва
            query_params = event.get('queryStringParameters') or {}
            review_id = query_params.get('id')
            
            if not review_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'ID отзыва обязателен'}),
                    'isBase64Encoded': False
                }
            
            delete_query = "DELETE FROM reviews WHERE id = %s RETURNING id"
            cursor.execute(delete_query, [review_id])
            result = cursor.fetchone()
            
            if not result:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Отзыв не найден'}),
                    'isBase64Encoded': False
                }
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'id': result[0],
                    'message': 'Отзыв удален'
                }),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Метод не поддерживается'}),
                'isBase64Encoded': False
            }
    
    except psycopg2.Error as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Ошибка базы данных: {str(e)}'}),
            'isBase64Encoded': False
        }
    
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Некорректный JSON в теле запроса'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Внутренняя ошибка сервера: {str(e)}'}),
            'isBase64Encoded': False
        }
    
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()