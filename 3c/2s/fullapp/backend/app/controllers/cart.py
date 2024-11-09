# app/controllers/cart.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.cart import CartItem
from ..models.product import Product
from ..database import add_to_db, delete_from_db, commit_changes
from .. import db

cart_bp = Blueprint('cart', __name__)

@cart_bp.route('', methods=['GET'])
@jwt_required()
def get_cart():
    """Получение корзины текущего пользователя"""
    current_user_id = get_jwt_identity()
    cart_items = CartItem.get_user_cart(current_user_id)
    return jsonify({
        'items': [item.to_dict() for item in cart_items],
        'total': CartItem.get_cart_total(current_user_id)
    }), 200

# Обновить метод добавления в корзину
@cart_bp.route('/add', methods=['POST'])
@jwt_required()
def add_to_cart():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    # Проверяем наличие товара в корзине
    cart_item = CartItem.query.filter_by(
        user_id=current_user_id,
        product_id=data['product_id']
    ).first()
    
    if cart_item:
        # Если товар уже есть, увеличиваем количество
        cart_item.quantity += data['quantity']
    else:
        # Если товара нет, создаем новый
        cart_item = CartItem(
            user_id=current_user_id,
            product_id=data['product_id'],
            quantity=data['quantity']
        )
        db.session.add(cart_item)
    
    db.session.commit()
    return jsonify(cart_item.to_dict()), 201

@cart_bp.route('/update/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_cart_item(item_id):
    """Обновление количества товара в корзине"""
    current_user_id = get_jwt_identity()
    cart_item = CartItem.query.filter_by(id=item_id, user_id=current_user_id).first_or_404()
    
    data = request.get_json()
    new_quantity = data['quantity']

    if new_quantity <= 0:
        delete_from_db(cart_item)
        return '', 204

    if cart_item.product.stock < new_quantity:
        return jsonify({'message': 'Недостаточно товара на складе'}), 400

    cart_item.quantity = new_quantity
    commit_changes()
    
    return jsonify(cart_item.to_dict()), 200

@cart_bp.route('/remove/<int:item_id>', methods=['DELETE'])
@jwt_required()
def remove_from_cart(item_id):
    """Удаление товара из корзины"""
    current_user_id = get_jwt_identity()
    cart_item = CartItem.query.filter_by(id=item_id, user_id=current_user_id).first_or_404()
    
    delete_from_db(cart_item)
    return '', 204

@cart_bp.route('/clear', methods=['DELETE'])
@jwt_required()
def clear_cart():
    """Очистка корзины"""
    current_user_id = get_jwt_identity()
    CartItem.query.filter_by(user_id=current_user_id).delete()
    commit_changes()
    return '', 204