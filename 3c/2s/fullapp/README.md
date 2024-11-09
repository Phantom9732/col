## Prerequisites
    - Python 3.8+
    - Node.js 14.0+
    - npm 6.14+

## Backend Setup
    cd backend
    python -m venv venv
    venv\Scripts\activate
    pip install -r requirements.txt
    python run.py

## Frontend Setup
    cd frontend
    npm install
    npm start

## Default Admin Account
    Username: admin
    Password: admin

## PI Documentation
Swagger UI available at: http://localhost:5000/docs/

## Project Structure
    pet-shop/
    ├── backend/
    │   ├── app/
    │   │   ├── models/
    │   │   │   ├── user.py
    │   │   │   ├── product.py
    │   │   │   ├── category.py
    │   │   │   ├── cart.py
    │   │   │   └── order.py
    │   │   ├── controllers/
    │   │   │   ├── auth.py
    │   │   │   ├── products.py
    │   │   │   ├── categories.py
    │   │   │   ├── cart.py
    │   │   │   └── orders.py
    │   │   ├── __init__.py
    │   │   ├── config.py
    │   │   └── database.py
    │   ├── requirements.txt
    │   └── run.py
    └── frontend/
        ├── src/
        │   ├── components/
        │   │   ├── common/
        │   │   │   ├── Navbar.js
        │   │   │   └── PrivateRoute.js
        │   │   ├── admin/
        │   │   └── user/
        │   ├── contexts/
        │   │   └── AuthContext.js
        │   ├── pages/
        │   │   ├── Home.js
        │   │   ├── Login.js
        │   │   └── Register.js
        │   └── App.js
        └── package.json