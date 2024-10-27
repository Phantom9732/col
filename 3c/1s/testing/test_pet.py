import requests
import pytest
import allure

BASE_URL = "https://petstore.swagger.io/v2"

@allure.feature('Pet')
class TestPet:

    @allure.story('Add new pet')
    def test_add_new_pet(self):
        pet_data = {
            "id": 0,
            "name": "Doggie",
            "photoUrls": ["string"],
            "status": "available"
        }
        with allure.step("Add a new pet to the store"):
            response = requests.post(f"{BASE_URL}/pet", json=pet_data)
            assert response.status_code == 200
            response_data = response.json()
            assert response_data['name'] == pet_data['name']
            pet_id = response_data['id']
            with allure.step("Get the pet by ID"):
                get_response = requests.get(f"{BASE_URL}/pet/{pet_id}")
                assert get_response.status_code == 200
                get_data = get_response.json()
                assert get_data['id'] == pet_id

    @allure.story('Get pet by ID')
    def test_get_pet_by_id(self):
        # Создаём питомца
        pet_data = {
            "id": 0,
            "name": "TestPet",
            "photoUrls": ["string"],
            "status": "available"
        }
        create_response = requests.post(f"{BASE_URL}/pet", json=pet_data)
        assert create_response.status_code == 200
        pet_id = create_response.json()['id']

        with allure.step(f"Get pet with ID {pet_id}"):
            response = requests.get(f"{BASE_URL}/pet/{pet_id}")
            assert response.status_code == 200
            response_data = response.json()
            assert response_data['id'] == pet_id
            assert response_data['name'] == pet_data['name']

    @allure.story('Update pet')
    def test_update_pet(self):
        pet_data = {
            "id": 0,
            "name": "Doggie",
            "photoUrls": ["string"],
            "status": "available"
        }
        response = requests.post(f"{BASE_URL}/pet", json=pet_data)
        assert response.status_code == 200
        pet_id = response.json()['id']

        updated_pet_data = {
            "id": pet_id,
            "name": "DoggieUpdated",
            "photoUrls": ["string"],
            "status": "sold"
        }
        with allure.step("Update the pet information"):
            update_response = requests.put(f"{BASE_URL}/pet", json=updated_pet_data)
            assert update_response.status_code == 200
            update_data = update_response.json()
            assert update_data['name'] == updated_pet_data['name']
            assert update_data['status'] == updated_pet_data['status']

    @allure.story('Delete pet')
    def test_delete_pet(self):
        pet_data = {
            "id": 0,
            "name": "Doggie",
            "photoUrls": ["string"],
            "status": "available"
        }
        response = requests.post(f"{BASE_URL}/pet", json=pet_data)
        assert response.status_code == 200
        pet_id = response.json()['id']

        with allure.step("Delete the pet"):
            delete_response = requests.delete(f"{BASE_URL}/pet/{pet_id}")
            assert delete_response.status_code == 200

            get_response = requests.get(f"{BASE_URL}/pet/{pet_id}")
            assert get_response.status_code == 404

    @allure.story('Find pets by status')
    def test_find_pets_by_status(self):
        status = 'available'
        with allure.step(f"Find pets with status {status}"):
            response = requests.get(f"{BASE_URL}/pet/findByStatus", params={'status': status})
            assert response.status_code == 200
            response_data = response.json()
            assert isinstance(response_data, list)
            for pet in response_data:
                assert pet['status'] == status
