'''
Business: Tracks visits and provides analytics data for admin
Args: event - HTTP event (POST to track, GET to retrieve stats)
      context - execution context
Returns: Visit tracking confirmation or analytics data
'''
import json
import os
from typing import Dict, Any
import psycopg2


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cursor = conn.cursor()
    
    if method == 'POST':
        request_context = event.get('requestContext', {})
        identity = request_context.get('identity', {})
        
        visitor_ip: str = identity.get('sourceIp', 'unknown')
        user_agent: str = identity.get('userAgent', 'unknown')
        
        body_data = json.loads(event.get('body', '{}'))
        page_path: str = body_data.get('path', '/')
        referrer: str = body_data.get('referrer', '')
        
        cursor.execute(
            "INSERT INTO analytics (visitor_ip, user_agent, page_path, referrer, visited_at) VALUES (%s, %s, %s, %s, NOW())",
            (visitor_ip, user_agent, page_path, referrer)
        )
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'success': True, 'message': 'Visit tracked'})
        }
    
    elif method == 'GET':
        cursor.execute("SELECT COUNT(*) FROM analytics")
        total_visits = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(DISTINCT visitor_ip) FROM analytics")
        unique_visitors = cursor.fetchone()[0]
        
        cursor.execute("""
            SELECT COUNT(*) FROM analytics 
            WHERE visited_at >= NOW() - INTERVAL '24 hours'
        """)
        visits_today = cursor.fetchone()[0]
        
        cursor.execute("""
            SELECT COUNT(*) FROM analytics 
            WHERE visited_at >= NOW() - INTERVAL '7 days'
        """)
        visits_week = cursor.fetchone()[0]
        
        cursor.execute("""
            SELECT page_path, COUNT(*) as count 
            FROM analytics 
            GROUP BY page_path 
            ORDER BY count DESC 
            LIMIT 10
        """)
        top_pages = [{'path': row[0], 'count': row[1]} for row in cursor.fetchall()]
        
        cursor.execute("""
            SELECT DATE(visited_at) as date, COUNT(*) as count 
            FROM analytics 
            WHERE visited_at >= NOW() - INTERVAL '30 days'
            GROUP BY DATE(visited_at) 
            ORDER BY date DESC
        """)
        daily_stats = [{'date': str(row[0]), 'count': row[1]} for row in cursor.fetchall()]
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'total_visits': total_visits,
                'unique_visitors': unique_visitors,
                'visits_today': visits_today,
                'visits_week': visits_week,
                'top_pages': top_pages,
                'daily_stats': daily_stats
            })
        }
    
    cursor.close()
    conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }
