# app/models/cart.py
from .. import db
from datetime import datetime

class CartItem(db.Model):
    __tablename__ = 'cart_items'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'product': self.product.to_dict(),
            'quantity': self.quantity,
            'total_price': self.get_total_price(),
            'created_at': self.created_at.isoformat()
        }

    def get_total_price(self):
        return self.product.price * self.quantity

    @staticmethod
    def get_user_cart(user_id):
        return CartItem.query.filter_by(user_id=user_id).all()

    @staticmethod
    def get_cart_total(user_id):
        cart_items = CartItem.get_user_cart(user_id)
        return sum(item.get_total_price() for item in cart_items)