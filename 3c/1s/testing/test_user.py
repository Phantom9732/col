import requests
import pytest
import allure
import random

BASE_URL = "https://petstore.swagger.io/v2"

@allure.feature('User')
class TestUser:

    @allure.story('Create user')
    def test_create_user(self):
        username = 'testuser' + str(random.randint(1000, 9999))
        user_data = {
            "username": username,
            "firstName": "Test",
            "lastName": "User",
            "email": f"{username}@example.com",
            "password": "password",
            "phone": "1234567890",
            "userStatus": 0
        }
        with allure.step("Create a new user"):
            response = requests.post(f"{BASE_URL}/user", json=user_data)
            assert response.status_code == 200
            assert response.json()['code'] == 200

    @allure.story('Get user by username')
    def test_get_user_by_username(self):
        username = 'testuser' + str(random.randint(1000, 9999))
        user_data = {
            "username": username,
            "firstName": "Test",
            "lastName": "User",
            "email": f"{username}@example.com",
            "password": "password",
            "phone": "1234567890",
            "userStatus": 0
        }
        create_response = requests.post(f"{BASE_URL}/user", json=user_data)
        assert create_response.status_code == 200
        assert create_response.json()['code'] == 200

        with allure.step(f"Get user with username {username}"):
            response = requests.get(f"{BASE_URL}/user/{username}")
            assert response.status_code == 200
            user_data = response.json()
            assert user_data['username'] == username

    @allure.story('Login user')
    def test_login_user(self):
        username = 'testuser' + str(random.randint(1000, 9999))
        password = 'password'
        user_data = {
            "username": username,
            "firstName": "Test",
            "lastName": "User",
            "email": f"{username}@example.com",
            "password": password,
            "phone": "1234567890",
            "userStatus": 0
        }
        create_response = requests.post(f"{BASE_URL}/user", json=user_data)
        assert create_response.status_code == 200
        assert create_response.json()['code'] == 200

        with allure.step(f"Login user with username {username}"):
            response = requests.get(f"{BASE_URL}/user/login", params={'username': username, 'password': password})
            assert response.status_code == 200
            assert 'logged in user session' in response.json()['message']

    @allure.story('Logout user')
    def test_logout_user(self):
        with allure.step("Logout user"):
            response = requests.get(f"{BASE_URL}/user/logout")
            assert response.status_code == 200
            assert response.json()['code'] == 200
            assert response.json()['message'] == 'ok'

    @allure.story('Delete user')
    def test_delete_user(self):
        username = 'testuser' + str(random.randint(1000, 9999))
        # Создаём пользователя
        user_data = {
            "username": username,
            "firstName": "Test",
            "lastName": "User",
            "email": f"{username}@example.com",
            "password": "password",
            "phone": "1234567890",
            "userStatus": 0
        }
        create_response = requests.post(f"{BASE_URL}/user", json=user_data)
        assert create_response.status_code == 200
        assert create_response.json()['code'] == 200

        with allure.step(f"Delete user with username {username}"):
            response = requests.delete(f"{BASE_URL}/user/{username}")
            assert response.status_code == 200
            assert response.json()['code'] == 200

            get_response = requests.get(f"{BASE_URL}/user/{username}")
            assert get_response.status_code == 404

    @allure.story('Create users with array')
    def test_create_users_with_array(self):
        users_data = [
            {
                "username": f"user{random.randint(1000, 9999)}",
                "firstName": "User1",
                "lastName": "Test",
                "email": "user1@example.com",
                "password": "password1",
                "phone": "1234567890",
                "userStatus": 0
            },
            {
                "username": f"user{random.randint(1000, 9999)}",
                "firstName": "User2",
                "lastName": "Test",
                "email": "user2@example.com",
                "password": "password2",
                "phone": "0987654321",
                "userStatus": 1
            }
        ]
        with allure.step("Create users with array"):
            response = requests.post(f"{BASE_URL}/user/createWithArray", json=users_data)
            assert response.status_code == 200
            assert response.json()['code'] == 200
