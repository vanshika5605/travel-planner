# app/api/itinerary_routes.py
from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from ..services.itinerary_service import ItineraryService
from ..utils.exceptions import ItineraryGenerationError

packing_list_blueprint = Blueprint('packing-list', __name__, url_prefix='/api/v1/packingList')

@packing_list_blueprint.route('/create', methods=['POST'])
@cross_origin()
def generate_itinerary(itinerary_service: ItineraryService):
    """
    API endpoint to generate a travel itinerary.
    
    Returns:
        JSON response with generated itinerary or error
    """
    try:
        # Validate input
        if not request.json:
            return jsonify({"error": "No input data provided"}), 400

        # Generate itinerary
        itinerary = itinerary_service.generate_itinerary(request.json)
        return jsonify({"itinerary": itinerary})

    except ItineraryGenerationError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Unexpected error occurred"}), 500


