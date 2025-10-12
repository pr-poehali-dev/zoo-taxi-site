'''
Business: Отправка уведомлений о новых заявках в Telegram и Email
Args: event с httpMethod, body (order_data, notification_settings)
Returns: HTTP response с результатом отправки
'''

import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
import urllib.request
import urllib.parse

def send_telegram_notification(bot_token: str, chat_id: str, message: str) -> bool:
    try:
        url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        data = urllib.parse.urlencode({
            'chat_id': chat_id,
            'text': message,
            'parse_mode': 'HTML'
        }).encode()
        
        req = urllib.request.Request(url, data=data)
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode())
            return result.get('ok', False)
    except Exception as e:
        print(f"Telegram error: {e}")
        return False

def send_email_notification(
    smtp_host: str, 
    smtp_port: int, 
    smtp_user: str, 
    smtp_password: str,
    to_email: str,
    subject: str,
    html_body: str
) -> bool:
    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = smtp_user
        msg['To'] = to_email
        
        html_part = MIMEText(html_body, 'html', 'utf-8')
        msg.attach(html_part)
        
        with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body_str = event.get('body', '{}')
        if not body_str or body_str.strip() == '':
            body_str = '{}'
        body_data = json.loads(body_str)
        order = body_data.get('order', {})
        settings = body_data.get('settings', {})
        
        if not order:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Order data required'})
            }
        
        results = {
            'telegram_sent': False,
            'email_sent': False,
            'errors': []
        }
        
        message_text = f"""
🔔 <b>Новая заявка на ЗооТакси</b>

👤 <b>Клиент:</b> {order.get('client_name', 'Не указано')}
📞 <b>Телефон:</b> {order.get('client_phone', 'Не указано')}

🐾 <b>Питомец:</b> {order.get('pet_name', 'Не указано')} ({order.get('pet_type', 'Не указано')})
🚗 <b>Услуга:</b> {order.get('service_type', 'Не указано')}

📍 <b>Откуда:</b> {order.get('pickup_address', 'Не указано')}
📍 <b>Куда:</b> {order.get('destination_address', 'Не указано')}

📅 <b>Дата:</b> {order.get('preferred_date', 'Не указано')} в {order.get('preferred_time', 'Не указано')}

💰 <b>Цена:</b> {order.get('estimated_price', 'Не указана')} ₽
"""
        
        if order.get('comments'):
            message_text += f"\n💬 <b>Комментарий:</b> {order['comments']}"
        
        if settings.get('telegram_enabled'):
            bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
            chat_id = settings.get('telegram_chat_id')
            
            if bot_token and chat_id:
                results['telegram_sent'] = send_telegram_notification(
                    bot_token, 
                    chat_id, 
                    message_text
                )
                if not results['telegram_sent']:
                    results['errors'].append('Failed to send Telegram notification')
            else:
                results['errors'].append('Telegram credentials not configured')
        
        if settings.get('email_enabled'):
            smtp_host = os.environ.get('SMTP_HOST')
            smtp_port = int(os.environ.get('SMTP_PORT', 587))
            smtp_user = os.environ.get('SMTP_USER')
            smtp_password = os.environ.get('SMTP_PASSWORD')
            to_email = settings.get('notification_email')
            
            if all([smtp_host, smtp_user, smtp_password, to_email]):
                email_html = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }}
        .content {{ background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }}
        .field {{ margin-bottom: 15px; }}
        .label {{ font-weight: bold; color: #2563eb; }}
        .value {{ margin-top: 5px; }}
        .footer {{ margin-top: 20px; padding: 15px; background: #e5e7eb; text-align: center; font-size: 12px; color: #6b7280; border-radius: 8px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🚗 Новая заявка на ЗооТакси УЮТ</h2>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">👤 Клиент:</div>
                <div class="value">{order.get('client_name', 'Не указано')}</div>
            </div>
            <div class="field">
                <div class="label">📞 Телефон:</div>
                <div class="value">{order.get('client_phone', 'Не указано')}</div>
            </div>
            <div class="field">
                <div class="label">🐾 Питомец:</div>
                <div class="value">{order.get('pet_name', 'Не указано')} ({order.get('pet_type', 'Не указано')})</div>
            </div>
            <div class="field">
                <div class="label">🚗 Услуга:</div>
                <div class="value">{order.get('service_type', 'Не указано')}</div>
            </div>
            <div class="field">
                <div class="label">📍 Откуда:</div>
                <div class="value">{order.get('pickup_address', 'Не указано')}</div>
            </div>
            <div class="field">
                <div class="label">📍 Куда:</div>
                <div class="value">{order.get('destination_address', 'Не указано')}</div>
            </div>
            <div class="field">
                <div class="label">📅 Дата и время:</div>
                <div class="value">{order.get('preferred_date', 'Не указано')} в {order.get('preferred_time', 'Не указано')}</div>
            </div>
            <div class="field">
                <div class="label">💰 Ориентировочная цена:</div>
                <div class="value">{order.get('estimated_price', 'Не указана')} ₽</div>
            </div>
            {'<div class="field"><div class="label">💬 Комментарий:</div><div class="value">' + order.get('comments', '') + '</div></div>' if order.get('comments') else ''}
        </div>
        <div class="footer">
            Это автоматическое уведомление из системы ЗооТакси УЮТ
        </div>
    </div>
</body>
</html>
"""
                
                results['email_sent'] = send_email_notification(
                    smtp_host,
                    smtp_port,
                    smtp_user,
                    smtp_password,
                    to_email,
                    f"Новая заявка #{order.get('id', 'N/A')} - {order.get('client_name', 'Клиент')}",
                    email_html
                )
                if not results['email_sent']:
                    results['errors'].append('Failed to send email notification')
            else:
                results['errors'].append('Email credentials not configured')
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps(results)
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }