import pytest
from unittest.mock import patch, MagicMock
from app.services.itinerary_service import ItineraryService
from app.utils.exceptions import ItineraryGenerationError

@pytest.fixture
def mock_itinerary_service():
    """Fixture to provide a mock instance of ItineraryService."""
    return ItineraryService()

# Test case for handling invalid JSON in response text
def test_invalid_json_parsing(mock_itinerary_service):
    invalid_json = "{ itinerary: [ }"  # Invalid JSON string
    result = mock_itinerary_service.extract_json_from_text(invalid_json)
    assert "errorMessage" in result  # Expect error handling for invalid JSON

# Test case for handling unexpected exceptions during itinerary generation
def test_generate_itinerary_unexpected_exception(mock_itinerary_service):
    with patch.object(ItineraryService, 'call_llama_api', side_effect=Exception("Unexpected error")):
        with pytest.raises(ItineraryGenerationError) as excinfo:
            mock_itinerary_service.generate_itinerary({
                "destination": "Paris",
                "travel_type": "Solo",
                "budget": 1500,
                "start_date": "2024-12-24",
                "end_date": "2024-12-28",
            })
        assert "Itinerary generation failed" in str(excinfo.value)

# Mock the response from Hugging Face API and other external dependencies
@pytest.fixture
def mock_itinerary_service_with_data():
    # Create a mock of the ItineraryService class
    mock_service = MagicMock(ItineraryService)
    
    # Mock the 'generate_itinerary' method of ItineraryService
    mock_service.generate_itinerary.return_value = {
        "summary": "Test Trip to Paris",
        "itinerary": [
            {"date": "2024-12-24", "day": "Day 1", "activities": [{"category": "Sightseeing", "activity": "Visit Eiffel Tower"}]},
            {"date": "2024-12-25", "day": "Day 2", "activities": [{"category": "Food", "activity": "Dinner at a French restaurant"}]},
        ],
        "budget": {"activities": 100, "food": 50, "accommodation": 200, "travel": 300, "miscellaneous": 50}
    }
    return mock_service

def test_generate_itinerary(mock_itinerary_service_with_data):
    # Replace the ItineraryService with our mock in the code under test
    with patch('app.api.itinerary_routes.ItineraryService', mock_itinerary_service_with_data):
        # Simulate a request to generate an itinerary
        params = {
            "destination": "Paris",
            "travel_type": "Family",
            "budget": 1000,
            "start_date": "2024-12-24",
            "end_date": "2024-12-26",
            "note": "Include cultural activities"
        }
        itinerary = mock_itinerary_service_with_data.generate_itinerary(params)

        # Validate the results
        assert itinerary["summary"] == "Test Trip to Paris"
        assert len(itinerary["itinerary"]) == 2
        assert itinerary["itinerary"][0]["day"] == "Day 1"
        assert itinerary["budget"]["activities"] == 100
