from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from ..services.packing_list_service import PackingListService

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
        if not request.json:
            return jsonify({"errorMessage": "No input data provided"}), 400

        # Create the ItineraryService instance with the HuggingFaceClient
        packing_list_service = PackingListService()

        # Generate itinerary
        response = packing_list_service.generate_packing_list(request.json)
        return response
    except PackingListGenerationError as e:
        return jsonify({"errorMessage": str(e)}), 500
    except Exception as e:
        return jsonify({"errorMessage": "Unexpected error occurred"}), 500
