from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from ..services.itinerary_service import PackingListService
from ..utils.huggingface_client import HuggingFaceClient  # Ensure HuggingFaceClient is imported
from ..utils.exceptions import PackingListGenerationError

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
        if not request.json or "api_url" not in request.json:
            return jsonify({"error": "API URL not provided"}), 400

        api_url = request.json["api_url"]
        
        # Instantiate HuggingFaceClient (assuming it's configured properly)
        huggingface_client = HuggingFaceClient()

        # Create the ItineraryService instance with the HuggingFaceClient
        packing_list_service = PackingListService(huggingface_client)

        # Generate itinerary
        packing_list = packing_list_service.generate_packing_list(api_url)
        return jsonify({"packingList": packing_list})

    except PackingListGenerationError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Unexpected error occurred"}), 500
