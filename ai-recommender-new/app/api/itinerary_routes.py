from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from ..services.itinerary_service import ItineraryService
from ..utils.huggingface_client import HuggingFaceClient
from ..utils.exceptions import ItineraryGenerationError
import traceback

itinerary_blueprint = Blueprint('itinerary', __name__, url_prefix='/api/v1/itinerary')

@itinerary_blueprint.route('/create', methods=['POST'])
@cross_origin()
def generate_itinerary():
    """
    API endpoint to generate a travel itinerary.
    
    Returns:
        JSON response with generated itinerary or error
    """
    try:
        # Validate input
        if not request.json:
            return jsonify({"error": "No input data provided"}), 400

        # Initialize the HuggingFaceClient and ItineraryService
        # Note: You'll need to replace with actual configuration
        huggingface_client = HuggingFaceClient(
            api_token='HUGGINGFACE_API_KEY', 
            model='meta-llama/Llama-3.2-3B-Instruct'
        )
        itinerary_service = ItineraryService(huggingface_client)
        
        # Generate itinerary
        print("Received JSON:", request.json)  # Logging for debugging
        itinerary = itinerary_service.generate_itinerary(request.json)
        
        return jsonify({"itinerary": itinerary})

    except ItineraryGenerationError as e:
        print(f"Itinerary Generation Error: {str(e)}")
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        print(traceback.format_exc())  # Print full traceback
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500