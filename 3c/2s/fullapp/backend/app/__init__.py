# app/__init__.py
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from .config import Config
from flasgger import Swagger

db = SQLAlchemy()
jwt = JWTManager()

def create_default_admin():
    from app.models.user import User
    
    # Проверяем, существует ли уже админ
    admin = User.query.filter_by(username='admin').first()
    if not admin:
        admin = User(
            username='admin',
            email='admin@example.com',
            is_admin=True
        )
        admin.set_password('admin')
        db.session.add(admin)
        db.session.commit()
        print('Администратор успешно создан')

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Упрощенная настройка CORS
    CORS(app, 
         supports_credentials=True,
         resources={r"/*": {"origins": "*"}})

    # Получаем абсолютный путь к файлу swagger.yaml
    swagger_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'swagger.yaml')
    
    app.config['SWAGGER'] = {
        'title': 'Pet Shop API',
        'uiversion': 3,
        'specs': [{
            'endpoint': 'swagger',
            'route': '/swagger.json',
            'rule_filter': lambda rule: True,
            'model_filter': lambda tag: True,
        }],
        'static_url_path': '/flasgger_static',
        'swagger_ui': True,
        'specs_route': '/docs/'  # Обратите внимание на слэш в конце
    }

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    
    # Initialize Swagger after other extensions
    swagger = Swagger(app, template_file=swagger_file)

    from app.controllers.auth import auth_bp
    from app.controllers.products import products_bp
    from app.controllers.categories import categories_bp
    from app.controllers.cart import cart_bp
    from app.controllers.orders import orders_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(products_bp, url_prefix='/api/products')
    app.register_blueprint(categories_bp, url_prefix='/api/categories')
    app.register_blueprint(cart_bp, url_prefix='/api/cart')
    app.register_blueprint(orders_bp, url_prefix='/api/orders')

    with app.app_context():
        db.create_all()
        create_default_admin()

    return app