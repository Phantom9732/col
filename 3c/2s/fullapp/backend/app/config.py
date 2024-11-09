# config.py
import os
from datetime import timedelta

class Config:
    # Основные настройки
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key-here'
    
    # Настройки базы данных
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///pet_shop.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Настройки JWT
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-key'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    
    # Настройки CORS
    CORS_HEADERS = [
        'Content-Type',
        'Authorization',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Methods'
    ]
    
    # Swagger настройки
    SWAGGER = {
        'title': 'Pet Shop API',
        'uiversion': 3,
        'version': '1.0.0',
        'description': 'API для магазина товаров для животных',
        'specs_route': '/docs/'
    }