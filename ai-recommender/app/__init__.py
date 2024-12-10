from flask import Flask
from flask_cors import CORS
from .config import get_config
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

    # Initialize services
    itinerary_service = ItineraryService()
    # Register blueprints
    from .api.itinerary_routes import itinerary_blueprint
    from .api.packing_list_routes import packing_list_blueprint
    app.register_blueprint(itinerary_blueprint)
    app.register_blueprint(packing_list_blueprint)

    return app