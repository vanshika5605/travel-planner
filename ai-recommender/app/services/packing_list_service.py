import requests
import os
import json
from huggingface_hub import InferenceClient
from ..utils.huggingface_client import HuggingFaceClient
from ..utils.exceptions import PackingListGenerationError

class PackingListService:
    """Service for generating packing lists based on travel itineraries."""
    
    def __init__(self, huggingface_client: HuggingFaceClient):
        self.huggingface_client = huggingface_client  # Updated to use the new HuggingFaceClient
        
    def fetch_trip_and_user_details(self, api_url):
        """
        Fetch trip and user details from an external API.

        Args:
            api_url (str): The API URL to fetch data from.

        Returns:
            tuple: A tuple containing gender, location, and itinerary details.

        Raises:
            PackingListGenerationError: If the API call fails or data is missing.
        """
        try:
            response = requests.get(api_url)
            if response.status_code != 200:
                raise PackingListGenerationError(f"Failed to fetch data. Status code: {response.status_code}")

            data = response.json()
            if not data.get("success"):
                raise PackingListGenerationError("API returned a failure response.")

            # Extract required fields
            user_details = data["data"]["userDetails"]
            user_itinerary = data["data"]["userItinerary"]

            gender = user_details.get("gender")
            location = user_details.get("location")
            itinerary = {
                "destination": user_itinerary.get("destination"),
                "mood": user_itinerary.get("mood"),
                "groupType": user_itinerary.get("groupType"),
                "startDate": user_itinerary.get("startDate"),
                "endDate": user_itinerary.get("endDate"),
                "activities": user_itinerary["tripDetails"]["itinerary"],
                "budget": {
                    "food": user_itinerary["budget"].get("food"),
                    "travel": user_itinerary["budget"].get("travel")
                }
            }

            return gender, location, itinerary

        except Exception as e:
            raise PackingListGenerationError(f"Error fetching trip and user details: {str(e)}")

    def generate_packing_list(self, api_url):
        """
        Generate a packing list based on the provided itinerary and gender.

        Args:
            gender (str): Gender for generating a packing list.
            itinerary (dict): Travel itinerary to base the packing list on.

        Returns:
            dict: The generated packing list as a Python dictionary.
        """
        try:
            
            gender, location, itinerary = self.fetch_trip_and_user_details(api_url)
            
            # Create a formatted message to send to the Hugging Face API
            list_message = self._create_packing_list_message(gender, itinerary)

            # Call the API to generate the packing list
            packing_list_str = self._create_list_from_itinerary(list_message)

            # Parse the response and return it as a Python dictionary
            packing_list = json.loads(packing_list_str)
            return packing_list

        except Exception as e:
            raise PackingListGenerationError(f"Packing list generation failed: {str(e)}")

    def _create_packing_list_message(self, gender, itinerary):
        """
        Create a formatted message to send to Hugging Face for packing list generation.

        Args:
            gender (str): Gender of the traveler.
            itinerary (dict): Travel itinerary details.

        Returns:
            str: Formatted message to send to the Hugging Face API.
        """
        list_message = f"""Itinerary Details:
        Destination: {itinerary['destination']}
        Mood: {itinerary['mood']}
        Group Type: {itinerary['groupType']}
        Start Date: {itinerary['startDate']}
        End Date: {itinerary['endDate']}
        Activities: {itinerary['activities']}
        Food Budget: {itinerary['budget']['food']}
        Travel Budget: {itinerary['budget']['travel']}
        Generate a packing list based on the above itinerary inputs for a {gender}:

        The packing list should include essentials like documents, clothing, toiletries, personal items, first aid, electronics, and miscellaneous items based on the destination, weather, and number of days.
        If information is missing, make reasonable assumptions and ensure practicality. The packing list should be in the following JSON format:

        "packingList": {{
            "essentialDocuments": [
                {{ "name": "Item", "quantity": 1, "packed": false }},
                {{ "name": "Item", "quantity": 1, "packed": false }}
            ],
            "clothing": [
                {{ "name": "T-Shirt", "quantity": 3, "packed": false }},
                {{ "name": "Underwear", "quantity": 4, "packed": false }}
            ],
            "toiletries": [
                {{ "name": "Toothbrush", "quantity": 1, "packed": false }}
            ],
            "personalEssentials": [
                {{ "name": "Passport", "quantity": 1, "packed": false }}
            ],
            "medicinesAndFirstAid": [
                {{ "name": "Painkillers", "quantity": 3, "packed": false }}
            ],
            "electronics": [
                {{ "name": "Phone", "quantity": 1, "packed": false }}
            ],
            "miscellaneous": [
                {{ "name": "Sunglasses", "quantity": 1, "packed": false }}
            ]
        }}"

        Please populate the packing list with items based on the itinerary details and reasonable assumptions.
        The output should contain only the packing list in the above format.
        """
        return list_message

    def _create_list_from_itinerary(self, message):
        """
        Send the itinerary message to Hugging Face API to generate a packing list.

        Args:
            message (str): Message containing the itinerary and packing list request.

        Returns:
            str: Response containing the generated packing list in JSON format.
        """
        try:
            # Initialize the InferenceClient
            client = InferenceClient(api_key=self.api_key)

            # Prepare the message for the API
            messages = [{"role": "user", "content": message}]
            
            # Make the API call with streaming enabled
            stream = client.chat.completions.create(
                model="meta-llama/Llama-3.2-3B-Instruct",
                messages=messages,
                temperature=0.5,
                max_tokens=2048,
                top_p=0.7,
                stream=True
            )

            # Process the streamed response
            output = ""
            for chunk in stream:
                delta = chunk.choices[0].delta.content
                output += delta

            return output

        except Exception as e:
            raise PackingListGenerationError(f"Error during API call: {str(e)}")
