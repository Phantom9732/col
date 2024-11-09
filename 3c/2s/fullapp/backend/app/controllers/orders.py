# app/controllers/orders.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import cross_origin
from ..models.order import Order, OrderItem, OrderStatus
from ..models.cart import CartItem
from ..models.user import User
from ..models.product import Product
from ..database import add_to_db, commit_changes, db
import traceback

orders_bp = Blueprint('orders', __name__)

def check_if_admin():
    current_user_id = get_jwt_identity()
    user = User.query.get_or_404(current_user_id)
    if not user.is_admin:
        return jsonify({'message': 'Требуются права администратора'}), 403
    return None

@orders_bp.route('', methods=['POST'])
@jwt_required()
def create_order():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Check cart items
        cart_items = CartItem.query.filter_by(user_id=current_user_id).all()
        if not cart_items:
            return jsonify({'message': 'Корзина пуста'}), 400
            
        # Validate stock before creating order
        for item in cart_items:
            if item.product.stock < item.quantity:
                return jsonify({
                    'message': f'Недостаточно товара "{item.product.name}" на складе. '
                              f'Доступно: {item.product.stock}, в корзине: {item.quantity}'
                }), 400
        
        # Calculate total
        total_amount = sum(item.product.price * item.quantity for item in cart_items)
        
        # Create order
        order = Order(
            user_id=current_user_id,
            shipping_address=data['shipping_address'],
            total_amount=total_amount,
            status='pending'
        )
        db.session.add(order)
        db.session.flush()
        
        # Create order items and update stock
        for cart_item in cart_items:
            order_item = OrderItem(
                order_id=order.id,
                product_id=cart_item.product_id,
                quantity=cart_item.quantity,
                price=cart_item.product.price
            )
            db.session.add(order_item)
            cart_item.product.stock -= cart_item.quantity
            
        # Clear cart
        CartItem.query.filter_by(user_id=current_user_id).delete()
        
        db.session.commit()
        return jsonify(order.to_dict()), 201
            
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 400

@orders_bp.route('', methods=['GET'])
@jwt_required()
def get_orders():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'message': 'Пользователь не найден'}), 404
            
        status = request.args.get('status', '')
        
        query = Order.query
        if not user.is_admin:
            query = query.filter_by(user_id=current_user_id)
        if status:
            query = query.filter_by(status=status)
            
        orders = query.all()
        orders_data = []
        
        for order in orders:
            order_dict = {
                'id': order.id,
                'user_id': order.user_id,
                'status': order.status,
                'total_amount': order.total_amount,
                'shipping_address': order.shipping_address,
                'created_at': order.created_at.isoformat(),
                'items': []
            }
            
            for item in order.items:
                product = Product.query.get(item.product_id)
                item_dict = {
                    'id': item.id,
                    'quantity': item.quantity,
                    'price': item.price,
                    'product_id': item.product_id,
                    'product': product.to_dict() if product else None
                }
                order_dict['items'].append(item_dict)
                
            orders_data.append(order_dict)
                
        return jsonify(orders_data), 200
        
    except Exception as e:
        print(f"Error in get_orders: {str(e)}")
        return jsonify({'message': 'Внутренняя ошибка сервера'}), 500

@orders_bp.route('/<int:order_id>', methods=['GET'])
@jwt_required()
def get_order(order_id):
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        order = Order.query.get_or_404(order_id)
        
        # Проверка прав доступа
        if not user.is_admin and order.user_id != current_user_id:
            return jsonify({'message': 'Доступ запрещен'}), 403
            
        return jsonify(order.to_dict()), 200
    except Exception as e:
        print(f"Error in get_order: {str(e)}")
        return jsonify({'message': 'Внутренняя ошибка сервера'}), 500

@orders_bp.route('/<int:order_id>/status', methods=['PUT'])
@jwt_required()
def update_order_status(order_id):
    data = request.get_json()
    new_status = data['status']
    
    if new_status not in vars(OrderStatus).values():
        return jsonify({'message': 'Неверный статус заказа'}), 400
    
    order = Order.query.get_or_404(order_id)
    old_status = order.status
    
    # Если заказ отменяется
    if new_status == OrderStatus.CANCELLED and old_status != OrderStatus.CANCELLED:
        # Возвращаем товары на склад
        for item in order.items:
            product = Product.query.get(item.product_id)
            if product:
                product.stock += item.quantity
    
    # Если заказ восстанавливается из отмененно��о состояния
    elif old_status == OrderStatus.CANCELLED and new_status != OrderStatus.CANCELLED:
        # Проверяем наличие товаров и снимаем их со склада
        for item in order.items:
            product = Product.query.get(item.product_id)
            if product:
                if product.stock < item.quantity:
                    return jsonify({
                        'message': f'Недостаточно товара {product.name} на складе'
                    }), 400
                product.stock -= item.quantity
    
    order.status = new_status
    db.session.commit()
    
    return jsonify(order.to_dict()), 200