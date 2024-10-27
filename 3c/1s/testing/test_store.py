import requests
import pytest
import allure
import datetime

BASE_URL = "https://petstore.swagger.io/v2"

@allure.feature('Store')
class TestStore:

    @allure.story('Place an order for a pet')
    def test_place_order(self):
        # Создаём питомца для заказа
        pet_data = {
            "id": 0,
            "name": "TestPetForOrder",
            "photoUrls": ["string"],
            "status": "available"
        }
        pet_response = requests.post(f"{BASE_URL}/pet", json=pet_data)
        assert pet_response.status_code == 200
        pet_id = pet_response.json()['id']

        order_data = {
            "id": 0,
            "petId": pet_id,
            "quantity": 1,
            "shipDate": datetime.datetime.now().isoformat(),
            "status": "placed",
            "complete": False
        }
        with allure.step("Place an order for a pet"):
            response = requests.post(f"{BASE_URL}/store/order", json=order_data)
            assert response.status_code == 200
            order_response = response.json()
            assert order_response['status'] == order_data['status']
            order_id = order_response['id']

            get_response = requests.get(f"{BASE_URL}/store/order/{order_id}")
            assert get_response.status_code == 200
            get_order = get_response.json()
            assert get_order['id'] == order_id

    @allure.story('Find purchase order by ID')
    def test_get_order_by_id(self):
        # Создаём заказ для теста
        pet_data = {
            "id": 0,
            "name": "TestPetForOrder",
            "photoUrls": ["string"],
            "status": "available"
        }
        pet_response = requests.post(f"{BASE_URL}/pet", json=pet_data)
        assert pet_response.status_code == 200
        pet_id = pet_response.json()['id']

        order_data = {
            "id": 0,
            "petId": pet_id,
            "quantity": 1,
            "shipDate": datetime.datetime.now().isoformat(),
            "status": "placed",
            "complete": False
        }
        order_response = requests.post(f"{BASE_URL}/store/order", json=order_data)
        assert order_response.status_code == 200
        order_id = order_response.json()['id']

        with allure.step(f"Get order with ID {order_id}"):
            response = requests.get(f"{BASE_URL}/store/order/{order_id}")
            assert response.status_code == 200
            order_data = response.json()
            assert order_data['id'] == order_id

    @allure.story('Delete purchase order by ID')
    def test_delete_order(self):
        # Создаём заказ для удаления
        pet_data = {
            "id": 0,
            "name": "TestPetForOrder",
            "photoUrls": ["string"],
            "status": "available"
        }
        pet_response = requests.post(f"{BASE_URL}/pet", json=pet_data)
        assert pet_response.status_code == 200
        pet_id = pet_response.json()['id']

        order_data = {
            "id": 0,
            "petId": pet_id,
            "quantity": 1,
            "shipDate": datetime.datetime.now().isoformat(),
            "status": "placed",
            "complete": False
        }
        order_response = requests.post(f"{BASE_URL}/store/order", json=order_data)
        assert order_response.status_code == 200
        order_id = order_response.json()['id']

        with allure.step(f"Delete order with ID {order_id}"):
            delete_response = requests.delete(f"{BASE_URL}/store/order/{order_id}")
            assert delete_response.status_code == 200

            get_response = requests.get(f"{BASE_URL}/store/order/{order_id}")
            assert get_response.status_code == 404

    @allure.story('Returns pet inventories by status')
    def test_get_inventory(self):
        with allure.step("Get store inventory"):
            response = requests.get(f"{BASE_URL}/store/inventory")
            assert response.status_code == 200
            inventory = response.json()
            assert isinstance(inventory, dict)

    @allure.story('Invalid order ID')
    def test_get_order_invalid_id(self):
        invalid_order_id = -1
        with allure.step(f"Get order with invalid ID {invalid_order_id}"):
            response = requests.get(f"{BASE_URL}/store/order/{invalid_order_id}")
            assert response.status_code == 404
