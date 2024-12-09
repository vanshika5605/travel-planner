from flask import Flask
from flask_cors import CORS
from .config import get_config
from .utils.huggingface_client import HuggingFaceClient
from .services.itinerary_service import ItineraryService
from .services.packing_list_service import PackingListService

def create_app(config_class=None):
    """
    Application factory function.
    
    Args:
        config_class: Configuration class to use
    
    Returns:
        Configured Flask application
    """
    # Use provided config or get default
    if config_class is None:
        config_class = get_config()

    # Create Flask app
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Enable CORS
    CORS(app)

    # Initialize Hugging Face service
    # Note: Replace with your actual API key and model
    huggingface_client = HuggingFaceClient(
        api_token='HUGGINGFACE_API_KEY', 
        model='meta-llama/Llama-3.2-3B-Instruct'
    )

    # Initialize services
    itinerary_service = ItineraryService(
        huggingface_client=huggingface_client, 
    )
    packing_list_service = PackingListService(
        huggingface_client=huggingface_client,
    )

    # Register blueprints
    from .api.itinerary_routes import itinerary_blueprint
    from .api.packing_list_routes import packing_list_blueprint
    app.register_blueprint(itinerary_blueprint)
    app.register_blueprint(packing_list_blueprint)

    return app