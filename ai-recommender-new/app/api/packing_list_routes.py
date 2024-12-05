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
        return {
            "packingList": {
                "essentialDocuments": [
                    { "name": "Passport", "quantity": 1, "packed": False },
                    { "name": "Travel Insurance", "quantity": 1, "packed": False },
                    { "name": "ID", "quantity": 1, "packed": False }
                ],
                "clothing": [
                    { "name": "T-Shirts", "quantity": 4, "packed": False },
                    { "name": "Underwear", "quantity": 4, "packed": False },
                    { "name": "Socks", "quantity": 6, "packed": False },
                    { "name": "Pants", "quantity": 3, "packed": False },
                    { "name": "Dress", "quantity": 1, "packed": False },
                    { "name": "Jacket", "quantity": 1, "packed": False }
                ],
                "toiletries": [
                    { "name": "Toothbrush", "quantity": 1, "packed": False },
                    { "name": "Toothpaste", "quantity": 1, "packed": False },
                    { "name": "Shampoo", "quantity": 1, "packed": False },
                    { "name": "Conditioner", "quantity": 1, "packed": False },
                    { "name": "Deodorant", "quantity": 1, "packed": False },
                    { "name": "Makeup", "quantity": 1, "packed": False },
                    { "name": "Hairbrush", "quantity": 1, "packed": False }
                ],
                "personalEssentials": [
                    { "name": "Phone", "quantity": 1, "packed": False },
                    { "name": "Wallet", "quantity": 1, "packed": False },
                    { "name": "Lip balm", "quantity": 1, "packed": False },
                    { "name": "Sunglasses", "quantity": 1, "packed": False },
                    { "name": "Watch", "quantity": 1, "packed": False }
                ],
                "medicinesAndFirstAid": [
                    { "name": "Pain relievers", "quantity": 3, "packed": False },
                    { "name": "Antihistamines", "quantity": 1, "packed": False },
                    { "name": "Band-Aids", "quantity": 10, "packed": False },
                    { "name": "Antibiotic ointment", "quantity": 1, "packed": False }
                ],
                "electronics": [
                    { "name": "Phone charger", "quantity": 1, "packed": False },
                    { "name": "Laptop charger", "quantity": 1, "packed": False },
                    { "name": "Camera", "quantity": 1, "packed": False },
                    { "name": "Portable charger", "quantity": 1, "packed": False }
                ],
                "miscellaneous": [
                    { "name": "Snacks", "quantity": 3, "packed": False },
                    { "name": "Water bottle", "quantity": 1, "packed": False },
                    { "name": "Travel pillow", "quantity": 1, "packed": False },
                    { "name": "Eye mask", "quantity": 1, "packed": False }
                ]
            }
        }
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
