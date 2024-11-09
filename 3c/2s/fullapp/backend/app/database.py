# app/database.py
from flask import current_app
from sqlalchemy.exc import SQLAlchemyError
from . import db

def init_db():
    """Инициализация базы данных"""
    try:
        with current_app.app_context():
            db.create_all()
    except SQLAlchemyError as e:
        print(f"Ошибка при инициализации базы данных: {e}")
        raise

def commit_changes():
    """Сохранение изменений в базе данных"""
    try:
        db.session.commit()
    except SQLAlchemyError as e:
        db.session.rollback()
        print(f"Ошибка при сохранении в базу данных: {e}")
        raise

def add_to_db(item):
    """Добавление записи в базу данных"""
    try:
        db.session.add(item)
        commit_changes()
    except SQLAlchemyError as e:
        print(f"Ошибка при добавлении в базу данных: {e}")
        raise

def delete_from_db(item):
    """Удаление записи из базы данных"""
    try:
        db.session.delete(item)
        commit_changes()
    except SQLAlchemyError as e:
        print(f"Ошибка при удалении из базы данных: {e}")
        raise