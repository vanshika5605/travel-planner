# app/utils/exceptions.py
class ItineraryGenerationError(Exception):
    """Exception raised for errors in itinerary generation."""
    def __init__(self, message="Failed to generate itinerary"):
        self.message = message
        super().__init__(self.message)

class PackingListGenerationError(Exception):
    """Exception raised for errors in packing list generation."""
    def __init__(self, message="Failed to generate packing list"):
        self.message = message
        super().__init__(self.message)

class DatabaseConnectionError(Exception):
    """Exception raised for database connection errors."""
    def __init__(self, message="Failed to connect to database"):
        self.message = message
        super().__init__(self.message)

class DatabaseOperationError(Exception):
    """Exception raised for database operation errors."""
    def __init__(self, message="Database operation failed"):
        self.message = message
        super().__init__(self.message)
