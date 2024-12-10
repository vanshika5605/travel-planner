import pytest
from unittest.mock import patch, MagicMock
from app.services.packing_list_service import PackingListService
from app.utils.exceptions import PackingListGenerationError

@pytest.fixture
def mock_packing_list_service():
    """Fixture to provide a mock instance of PackingListService."""
    return PackingListService()

# Test case for successful packing list generation
def test_generate_packing_list_success(mock_packing_list_service):
    with patch.object(PackingListService, 'generate_packing_list_from_message', return_value='{"packingList": {"clothing": [{"name": "T-Shirt", "quantity": 3, "packed": false}]}}'):
        params = {
            "gender": "Female",
            "itinerary": "Test Itinerary"
        }
        packing_list = mock_packing_list_service.generate_packing_list(params)
        assert "packingList" in packing_list
        assert packing_list["packingList"]["clothing"][0]["name"] == "T-Shirt"

# Test case for handling API error during packing list generation
def test_generate_packing_list_api_error(mock_packing_list_service):
    with patch.object(PackingListService, 'generate_packing_list_from_message', side_effect=Exception("API error")):
        params = {
            "gender": "Male",
            "itinerary": "Test Itinerary"
        }
        with pytest.raises(PackingListGenerationError) as excinfo:
            mock_packing_list_service.generate_packing_list(params)
        assert "Packing list generation failed" in str(excinfo.value)

# Test case for generating packing list from a message
def test_generate_packing_list_from_message(mock_packing_list_service):
    with patch.object(PackingListService, 'generate_packing_list_from_message', return_value='{"packingList": {"electronics": [{"name": "Charger", "quantity": 1, "packed": false}]}}'):
        response = mock_packing_list_service.generate_packing_list_from_message("Unisex", "Test Itinerary")
        assert "electronics" in response


