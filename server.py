# server.py

from flask import Flask, send_from_directory, request, jsonify
from ssl_config import create_self_signed_cert, get_ssl_context
from card_encryption import CardEncryption
from datetime import timedelta
import os

app = Flask(__name__)

# Настройка безопасности
app.config.update(
    SESSION_COOKIE_SECURE=True,
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE='Strict',
    PERMANENT_SESSION_LIFETIME=timedelta(minutes=30)
)

encryptor = CardEncryption()

# Добавляем заголовки безопасности
@app.after_request
def add_security_headers(response):
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['Content-Security-Policy'] = "default-src 'self'"
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    return response

# API для приёма и шифрования карты
@app.route('/api/attach_card', methods=['POST'])
def attach_card():
    data = request.json
    required = ['number', 'expiry', 'cvv', 'holder']
    if not all(k in data for k in required):
        return jsonify({'success': False, 'message': 'Некорректные данные'}), 400
    # Шифруем все данные карты одной строкой
    card_str = f"{data['number']}|{data['expiry']}|{data['cvv']}|{data['holder']}"
    encrypted = encryptor.encrypt_card_data(card_str)
    # Можно сохранить encrypted в БД или файл (демонстрация)
    with open('cards.txt', 'a', encoding='utf-8') as f:
        f.write(encrypted + '\n')
    return jsonify({'success': True, 'message': 'Карта успешно привязана'})

# Маршруты
@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_files(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    # Создаем сертификат, если его нет
    if not (os.path.exists('server.crt') and os.path.exists('server.key')):
        create_self_signed_cert()

    # Запускаем сервер с SSL
    context = get_ssl_context()
    app.run(host='0.0.0.0', port=443, ssl_context=context)