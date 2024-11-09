# app/controllers/products.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .. import db
from ..models.product import Product
from ..models.user import User
from ..database import add_to_db, delete_from_db, commit_changes
from ..models.cart import CartItem
from ..models.order import OrderItem

products_bp = Blueprint('products', __name__)

def check_if_admin():
    current_user_id = get_jwt_identity()
    user = User.query.get_or_404(current_user_id)
    if not user.is_admin:
        return jsonify({'message': 'Требуются права администратора'}), 403
    return None

@products_bp.route('', methods=['GET'])
def get_products():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    category_id = request.args.get('category_id', type=int)
    
    query = Product.query
    if category_id:
        query = query.filter_by(category_id=category_id)
    
    products = query.paginate(page=page, per_page=per_page)
    
    return jsonify({
        'items': [product.to_dict() for product in products.items],
        'total': products.total,
        'pages': products.pages,
        'current_page': products.page
    }), 200

@products_bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict()), 200

@products_bp.route('', methods=['POST'])
@jwt_required()
def create_product():
    admin_check = check_if_admin()
    if admin_check:
        return admin_check
    
    data = request.get_json()
    product = Product(
        name=data['name'],
        description=data.get('description', ''),
        price=data['price'],
        stock=data['stock'],
        image_url=data.get('image_url'),
        category_id=data['category_id']
    )
    
    add_to_db(product)
    return jsonify(product.to_dict()), 201

@products_bp.route('/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    admin_check = check_if_admin()
    if admin_check:
        return admin_check
    
    product = Product.query.get_or_404(product_id)
    data = request.get_json()
    
    product.name = data.get('name', product.name)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.stock = data.get('stock', product.stock)
    product.image_url = data.get('image_url', product.image_url)
    product.category_id = data.get('category_id', product.category_id)
    
    commit_changes()
    return jsonify(product.to_dict()), 200

@products_bp.route('/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    try:
        # Проверка прав администратора
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if not user.is_admin:
            return jsonify({'message': 'Требуются права администратора'}), 403

        product = Product.query.get_or_404(product_id)
        
        # Проверяем наличие товара в заказах
        if OrderItem.query.filter_by(product_id=product_id).first():
            return jsonify({
                'message': 'Невозможно удалить товар, который есть в заказах'
            }), 400
            
        try:
            # Удаляем связанные записи из корзины
            cart_items = CartItem.query.filter_by(product_id=product_id).all()
            for item in cart_items:
                delete_from_db(item)
            
            # Удаляем сам товар
            delete_from_db(product)
            commit_changes()
            
            return '', 204
            
        except Exception as e:
            db.session.rollback()
            raise e
            
    except Exception as e:
        print(f"Error deleting product: {str(e)}")
        return jsonify({'message': 'Ошибка при удалении товара'}), 500