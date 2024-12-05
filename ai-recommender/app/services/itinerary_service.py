import json
import re
from bson import ObjectId
from datetime import datetime
from ..utils.huggingface_client import HuggingFaceClient  # Updated import for new HuggingFaceClient
from ..utils.exceptions import ItineraryGenerationError, DatabaseOperationError

class ItineraryService:
    """Service for generating and managing travel itineraries."""
    
    def __init__(self, huggingface_client: HuggingFaceClient):
        self.huggingface_client = huggingface_client  # Updated to use the new HuggingFaceClient

    def generate_itinerary(self, params):
        """
        Generate a travel itinerary, extract the itinerary from Hugging Face response,
        
        Args:
            params (dict): Itinerary generation parameters
        
        Returns:
            dict: Generated itinerary with MongoDB _id
        """
        try:
            # Extract parameters with defaults
            destination = params.get('destination', 'Boston')
            travel_type = params.get('travel_type', 'Family')
            budget = params.get('budget', None)
            start_date = params.get('start_date', '2024-12-24')
            end_date = params.get('end_date', '2024-12-26')
            note = params.get('note', '')
            # This should be loaded from another API
            start_point = params.get('start_point', 'Amherst')
            # Prepare message for Hugging Face API
            message = self._create_itinerary_prompt(destination, travel_type, budget, start_date, end_date, start_point, note)

            # Generate itinerary from Hugging Face service
            response_text = self.huggingface_client.chat_completion([{"role": "user", "content": message}])

            # Extract itinerary JSON from the response
            itinerary = self._extract_itinerary(response_text)
            return itinerary

        except Exception as e:
            raise ItineraryGenerationError(f"Itinerary generation failed: {str(e)}")

    def _create_itinerary_prompt(self, destination, travel_type, budget, start_date, end_date, start_point, note):
        """
        Create a prompt for generating itinerary based on user inputs.

        Args:
            destination (str): Travel destination
            travel_type (str): Type of travel (e.g., Family, Solo)
            budget (str): Budget for the trip
            start_date (str): Start date for the itinerary
            end_date (str): End date for the itinerary
            start_point (str): Starting point of the journey
            note (str): Any additional notes for the trip

        Returns:
            str: Formatted prompt for itinerary generation
        """
        budget_str = f"{budget} USD" if budget else "Not specified"
        prompt = f"""
        Generate a travel itinerary based on the following inputs:
        1. **Destinations:** {destination}
        2. **Travel Type:** {travel_type}
        3. **Budget:** {budget_str}
        4. **Start Date:** {start_date}
        5. **End Date:** {end_date}
        6. **Travelling from** {start_point}

        The itinerary should include a detailed activity for all day-wise plan like Day 1, Day 2 and so on.
        Assume any information not provided for better results. Also consider {note}
        Add budget spent for the whole trip and keep total budget under the {budget_str}
        The itinerary should be displayed in the following format and the budget in the following:
        summary: 'summary of the trip in a line detail'
        itinerary: [
            {{
                date: '2024-03-30',
                day: 'Day 1',
                weekDay: '---day of the week---',
                activities: [
                  {{ category: 'Travel', activity: '--activity--' }},
                  {{ category: 'Hotel', activity: '--activity--' }},
                  {{ category: 'Adventure', activity: '--activity--' }},
                  {{ category: 'Sightseeing', activity: '--activity--' }},
                  {{ category: 'Shopping', activity: '--activity--' }},
                ],
            }},
            {{
                date: '2024-03-31',
                day: 'Day 2',
                weekDay: '---day of the week---',
                activities: [
                  {{ category: 'Adventure', activity: '--activity--' }},
                  {{ category: 'Food', activity: '--activity--' }},
                ],
            }},
        ],
        budget: {{
            'activities': '---int budget---',
            'miscellaneous': '---int budget---',
            'accommodation': '---int budget---',
            'food': '---int budget---',
            'travel': '---int budget---',
        }}   
        """
        return prompt

    def _extract_itinerary(self, response_text):
        """
        Extract the itinerary JSON from the Hugging Face API response.

        Args:
            response_text (str): The response text from the Hugging Face API, including itinerary in JSON format.

        Returns:
            dict: The parsed itinerary JSON as a Python dictionary.

        Raises:
            ValueError: If the JSON part is not found in the response.
        """
        try:
            # Use regular expression to find the JSON part of the response
            match = re.search(r'("itinerary":\s*\[\s*\{.*?\}\s*(?:,\s*\{.*?\})*\s*\])', response_text, re.DOTALL)

            if match:
                # Extract the matched JSON string
                itinerary_json = match.group(1)

                # Parse the JSON string into a Python dictionary
                itinerary = json.loads(itinerary_json)

                return itinerary
            else:
                raise ValueError("No itinerary JSON found in the response")
        except Exception as e:
            raise ValueError(f"Error extracting itinerary: {str(e)}")
