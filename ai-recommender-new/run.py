from flask import Flask
from app import create_app

# Create the Flask application
app = create_app()

# This block ensures the app only runs when the script is executed directly
if __name__ == '__main__':
    # Run the application in debug mode
    # Set debug=False in production
    app.run(debug=True, host='0.0.0.0', port=5000)