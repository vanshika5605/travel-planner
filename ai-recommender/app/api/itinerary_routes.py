"""
Module: itinerary_blueprint.py

This module defines a Flask Blueprint for the `/api/v1/itinerary` API endpoint, 
which provides functionality to generate travel itineraries using an itinerary 
service. It includes input validation, error handling, and integration with 
other utilities such as the Hugging Face API for natural language generation.

Error handling is implemented to manage both predictable errors (like 429 Too Many Requests) 
and unexpected exceptions, ensuring proper API responses for clients.

Dependencies:
    - Flask: For API routing and response handling
    - Flask-CORS: For handling Cross-Origin Resource Sharing (CORS) requests
    - ItineraryService: Custom service class for generating itineraries
    - ItineraryGenerationError: Custom exception for itinerary generation failures
"""

from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from ..services.itinerary_service import ItineraryService
from ..utils.exceptions import ItineraryGenerationError
import traceback

# The Blueprint for the itinerary module
itinerary_blueprint = Blueprint('itinerary', __name__, url_prefix='/api/v1/itinerary')

@itinerary_blueprint.route('/create', methods=['POST'])
@cross_origin()
def generate_itinerary():
    """
    API endpoint to generate a travel itinerary.
    
    This endpoint takes a JSON request payload containing travel details and 
    generates a custom travel itinerary using the ItineraryService. The function 
    handles errors gracefully, including rate-limiting errors (429) from external APIs.
    
    Returns:
        JSON response with the generated itinerary or an appropriate error message.
        - 200: Successful response with the itinerary
        - 400: Bad request if input data is missing or invalid
        - 429: Rate-limiting error, advising the user to try again later
        - 500: Internal server error for unexpected issues
    """
    try:
        # Validate input: Ensure JSON payload is provided
        if not request.json:
            return jsonify({"errorMessage": "No input data provided"}), 400

        # Create an instance of the itinerary service
        itinerary_service = ItineraryService()
    
        # Generate the travel itinerary
        itinerary = itinerary_service.generate_itinerary(request.json)
        
        # Return the generated itinerary
        return (itinerary)

    except ItineraryGenerationError as e:
        # Check if the error relates to a 429 Too Many Requests
        if "429" in str(e):  # Assuming the exception message contains the status code

            print(f"Itinerary Generation Error (429): {str(e)}")
            return jsonify({"errorMessage": "Itinerary generation failed due to too many requests. Please try again in a few minutes."}), 429
        else:
            # Handle other cases of ItineraryGenerationError
            print(f"Itinerary Generation Error: {str(e)}")
            return jsonify({"errorMessage": str(e)}), 500
    except Exception as e:
        # Catch all other unexpected exceptions
        print(f"Unexpected error: {str(e)}")
        print(traceback.format_exc())  # Print the full traceback for debugging
        return jsonify({"errorMessage": f"Unexpected error: {str(e)}"}), 500
