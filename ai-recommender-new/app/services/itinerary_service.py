import json
import re
import requests
from datetime import datetime
from ..utils.huggingface_client import HuggingFaceClient
from ..utils.exceptions import ItineraryGenerationError, DatabaseOperationError

class ItineraryService:
    """Service for generating and managing travel itineraries."""
    
    def __init__(self, huggingface_client: HuggingFaceClient):
        self.huggingface_client = huggingface_client

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
            
            # Try to fetch start point, fallback to a default if API fails
            try:
                start_point = self._get_start_point_from_api()
            except Exception as api_error:
                print(f"API Error: {api_error}. Using default start point.")
                start_point = "Boston, MA"

            # Prepare message for Hugging Face API
            message = self._create_itinerary_prompt(destination, travel_type, budget, start_date, end_date, start_point, note)
            print("HELLO1")
            return {
                "summary": "A 2-day family trip to Boston, exploring the city's iconic landmarks, enjoying local food, and taking a scenic harbor cruise.",
                "itinerary": [
                    {
                    "date": "2024-12-24",
                    "day": "Day 1",
                    "weekDay": "Wednesday",
                    "activities": [
                        {
                        "category": "Travel",
                        "activity": "Drive from Amherst to Boston ( approx. 2 hours)"
                        },
                        {
                        "category": "Accommodation",
                        "activity": "Check-in at a budget-friendly hotel in Boston ( approx. 20 USD per night)"
                        },
                        {
                        "category": "Sightseeing",
                        "activity": "Visit the Boston Common (free admission)"
                        },
                        {
                        "category": "Shopping",
                        "activity": "Explore the Quincy Market (free admission)"
                        },
                        {
                        "category": "Food",
                        "activity": "Grab a slice of pizza at a local pizzeria ( approx. 10 USD per person)"
                        }
                    ]
                    },
                    {
                    "date": "2024-12-25",
                    "day": "Day 2",
                    "weekDay": "Thursday",
                    "activities": [
                        {
                        "category": "Sightseeing",
                        "activity": "Take a scenic harbor cruise ( approx. 20 USD per person)"
                        },
                        {
                        "category": "Food",
                        "activity": "Enjoy a family-friendly breakfast at a local café ( approx. 15 USD per person)"
                        }
                    ]
                    }
                ],
                "budget": {
                    "activities": 50,
                    "miscellaneous": 10,
                    "accommodation": 40,
                    "food": 35,
                    "travel": 5
                }
            }

            # Generate itinerary from Hugging Face service
            response_text = ""
            for response in self.huggingface_client.chat_completion([{"role": "user", "content": message}]):
                if response:
                    print(response)
                    # Assuming the response has a 'choices' field with 'delta' containing the content
                    delta = response.get("choices", [{}])[0].get("delta", {}).get("content", "")
                    response_text += delta

            print("HELLO2")
           
            # Extract itinerary JSON from the response
            itinerary = self._extract_itinerary(response_text)
            print("HELLO3")
            print(itinerary)
            return itinerary

        except Exception as e:
            raise ItineraryGenerationError(f"Itinerary generation failed: {str(e)}")

    def _get_start_point_from_api(self):
        """
        Fetch the start point from the API (userDetails.location).
        
        Returns:
            str: The start point location (user's location).
        
        Raises:
            Exception: If there is an issue with the API call or response.
        """
        try:
            # Define the API URL
            api_url = "https://39da-128-119-202-80.ngrok-free.app/api/v1/tripAndUserDetails/TB-x6W0"
            
            # Make the API call with a timeout
            response = requests.get(api_url, timeout=40)
            # Check HTTP status code
            if response.status_code != 200:
                raise Exception(f"API returned status code {response.status_code}")
            
            response_data = response.json()
            print(response_data)
            
            # Check if the API response is successful
            if response_data is not None:
                # Extract start point (userDetails.location)
                print(response_data)
                start_point = response_data['data']['userDetails']['location']
                print(start_point)
                return start_point
            else:
                raise Exception(f"API call failed: {response_data.get('errorMessage', 'Unknown error')}")
        
        except requests.RequestException as e:
            # Handle network-related errors
            raise Exception(f"Network error fetching start point: {str(e)}")
        except (KeyError, ValueError) as e:
            # Handle parsing errors
            raise Exception(f"Error parsing API response: {str(e)}")

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
        The itinerary should be displayed in the following JSON format:
        {{
            "summary": "summary of the trip in a line detail",
            "itinerary": [
                {{
                    "date": "2024-03-30",
                    "day": "Day 1",
                    "weekDay": "---day of the week---",
                    "activities": [
                        {{"category": "Travel", "activity": "--activity--"}},
                        {{"category": "Hotel", "activity": "--activity--"}},
                        {{"category": "Adventure", "activity": "--activity--"}},
                        {{"category": "Sightseeing", "activity": "--activity--"}},
                        {{"category": "Shopping", "activity": "--activity--"}}
                    ]
                }},
                {{
                    "date": "2024-03-31",
                    "day": "Day 2",
                    "weekDay": "---day of the week---",
                    "activities": [
                        {{"category": "Adventure", "activity": "--activity--"}},
                        {{"category": "Food", "activity": "--activity--"}}
                    ]
                }}
            ],
            "budget": {{
                "activities": "---int budget---",
                "miscellaneous": "---int budget---",
                "accommodation": "---int budget---",
                "food": "---int budget---",
                "travel": "---int budget---"
            }}
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
            print("Hello4")
            print(response_text)
            # Use regular expression to find the JSON part of the response
            match = re.search(r'({.*"itinerary".*})', response_text, re.DOTALL)

            if match:
                # Extract the matched JSON string
                itinerary_json = match.group(1)

                # Parse the JSON string into a Python dictionary
                itinerary = json.loads(itinerary_json)

                return itinerary
            else:
                raise ValueError("No itinerary JSON found in the response")
        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON format: {str(e)}")
        except Exception as e:
            raise ValueError(f"Error extracting itinerary: {str(e)}")