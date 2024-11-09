# app/controllers/categories.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.category import Category
from ..models.user import User
from ..database import add_to_db, delete_from_db, commit_changes

categories_bp = Blueprint('categories', __name__)

def check_if_admin():
    current_user_id = get_jwt_identity()
    user = User.query.get_or_404(current_user_id)
    if not user.is_admin:
        return jsonify({'message': 'Требуются права администратора'}), 403
    return None

@categories_bp.route('', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories]), 200

@categories_bp.route('/<int:category_id>', methods=['GET'])
def get_category(category_id):
    category = Category.query.get_or_404(category_id)
    return jsonify(category.to_dict()), 200

@categories_bp.route('', methods=['POST'])
@jwt_required()
def create_category():
    admin_check = check_if_admin()
    if admin_check:
        return admin_check
    
    data = request.get_json()
    
    if Category.query.filter_by(name=data['name']).first():
        return jsonify({'message': 'Категория с таким именем уже существует'}), 400
    
    category = Category(
        name=data['name'],
        description=data.get('description', ''),
        image_url=data.get('image_url')
    )
    
    add_to_db(category)
    return jsonify(category.to_dict()), 201

@categories_bp.route('/<int:category_id>', methods=['PUT'])
@jwt_required()
def update_category(category_id):
    admin_check = check_if_admin()
    if admin_check:
        return admin_check
    
    category = Category.query.get_or_404(category_id)
    data = request.get_json()
    
    if 'name' in data and data['name'] != category.name:
        if Category.query.filter_by(name=data['name']).first():
            return jsonify({'message': 'Категория с таким именем уже существует'}), 400
        category.name = data['name']
    
    category.description = data.get('description', category.description)
    category.image_url = data.get('image_url', category.image_url)
    
    commit_changes()
    return jsonify(category.to_dict()), 200

@categories_bp.route('/<int:category_id>', methods=['DELETE'])
@jwt_required()
def delete_category(category_id):
    admin_check = check_if_admin()
    if admin_check:
        return admin_check
    
    category = Category.query.get_or_404(category_id)
    
    # Проверяем, есть ли товары в категории
    if category.products:
        return jsonify({
            'message': 'Невозможно удалить категорию, содержащую товары'
        }), 400
    
    delete_from_db(category)
    return '', 204