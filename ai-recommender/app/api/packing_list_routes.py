from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from ..services.itinerary_service import ItineraryService
from ..utils.huggingface_client import HuggingFaceClient  # Ensure HuggingFaceClient is imported
from ..utils.exceptions import ItineraryGenerationError

packing_list_blueprint = Blueprint('packing-list', __name__, url_prefix='/api/v1/packingList')

@packing_list_blueprint.route('/create', methods=['POST'])
@cross_origin()
def generate_packing_list():
    """
    API endpoint to generate a travel itinerary.
    
    Returns:
        JSON response with generated itinerary or error
    """
    try:
        # Validate input
        if not request.json:
            return jsonify({"error": "No input data provided"}), 400
        
        # Instantiate HuggingFaceClient (assuming it's configured properly)
        huggingface_client = HuggingFaceClient()

        # Create the ItineraryService instance with the HuggingFaceClient
        itinerary_service = ItineraryService(huggingface_client)

        # Generate itinerary
        itinerary = itinerary_service.generate_itinerary(request.json)
        return jsonify({"itinerary": itinerary})

    except ItineraryGenerationError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Unexpected error occurred"}), 500
