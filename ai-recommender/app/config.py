# app/config.py
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Base configuration class."""
    api_token = os.getenv('HUGGINGFACE_API_KEY')
    
    DEBUG = False
    TESTING = False

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True

class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False

class TestingConfig(Config):
    """Testing configuration."""
    TESTING = True

def get_config():
    """Return the appropriate configuration based on environment."""
    env = os.getenv('FLASK_ENV', 'development')
    if env == 'production':
        return ProductionConfig
    elif env == 'testing':
        return TestingConfig
    return DevelopmentConfig
