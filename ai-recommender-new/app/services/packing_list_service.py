import json
from flask import jsonify
from huggingface_hub import InferenceClient
from .itinerary_service import ItineraryService
from ..utils.exceptions import PackingListGenerationError

class PackingListService:
    """Service for generating packing lists based on travel itineraries."""
    def __init__(self):
        # Make itinerary_service an instance variable
        self.itinerary_service = ItineraryService()

    def generate_packing_list(self, params):
        """
        Generate a packing list based on the provided itinerary and gender.

        Args:
            gender (str): Gender for generating a packing list.
            itinerary (dict): Travel itinerary to base the packing list on.

        Returns:
            dict: The generated packing list as a Python dictionary.
        """
        try:
            # Attempt to get additional data from the ItineraryService API
            try:
                tripID = params.get('tripID', 'TB-23yZ')
                gender_itinerary_dict = self.itinerary_service._get_start_point_from_api(1,tripID)
            except Exception as api_error:
                print(f"API Error: {api_error}. Using default values.")
                gender_itinerary_dict = {
                    "gender": "Unisex", 
                    "itinerary": "Give basic itinerary for travel"
                }
            
            # Create a formatted message for the Hugging Face API
            packing_list_str = self.generate_packing_list_from_message(gender_itinerary_dict.get("gender"), gender_itinerary_dict.get("itinerary"))
            # Parse the response and return it as a Python dictionary
            packing_list = json.loads(packing_list_str)
            return packing_list

        except Exception as e:
            raise PackingListGenerationError(f"Packing list generation failed: {str(e)}")

    def generate_packing_list_from_message(self, gender,itinerary):
        """
        Generates a packing list for a trip based on the itinerary.

        Args:
        - itinerary (str): Details of the trip.

        Returns:
        - str: The packing list in the specified format.
        """

        list_message =  f"""Itinerary""" + str(itinerary) + f"""
        Generate a packing list based on the above itinerary inputs for a {gender}:

        The packing list should incluse a list of essentials documents, clothing, toiletries, personal essentials, general medicines and first aid, electronics and ,miscellaneous itmes based on the destination, weather of destination and number of days.
        If information is missing, make reasonable assumptions and ensure practicality.
        The packing list be displayed in the following json format:
        "packingList: {{
        essentialDocuments: [
                {{ name: 'Item', quantity: , packed: false }},
                {{ name: 'Item', quantity: , packed: false }},
                {{ name: 'Item', quantity: , packed: false }},
                ],
                clothing: [
                {{ name: 'T-Shirts', quantity: 3, packed: false }},
                {{ name: 'Underwear', quantity: 4, packed: false }},
                {{ name: 'Socks', quantity: 3, packed: false }},
                {{ name: 'Pants', quantity: 2, packed: false }},
                ],
                toiletries: [
                {{ name: 'T-Shirts', quantity: 3, packed: false }},
                {{ name: 'Underwear', quantity: 4, packed: false }},
                {{ name: 'Socks', quantity: 3, packed: false }},
                ],
                personalEssentiala: [
                {{ name: '', quantity: , packed: false }},
                {{ name: '', quantity: , packed: false }},
                {{ name: '', quantity: , packed: false }},
                ],
                medicinesAndFirstAid: [
                {{ name: '', quantity: 3, packed: false }},
                {{ name: '', quantity: 4, packed: false }},
                {{ name: '', quantity: 3, packed: false }},
                ],
                electronics: [
                {{ name: 'T-Shirts', quantity: 3, packed: false }},
                {{ name: 'Underwear', quantity: 4, packed: false }},
                {{ name: 'Socks', quantity: 3, packed: false }},
                {{ name: 'Pants', quantity: 2, packed: false }},
                ],
                miscellaneous: [
                {{ name: 'T-Shirts', quantity: 3, packed: false }},
                {{ name: 'Underwear', quantity: 4, packed: false }},
                {{ name: 'Socks', quantity: 3, packed: false }},
                {{ name: 'Pants', quantity: 2, packed: false }},
                ],
                }}"

        The specific items in the above list is just an example. Populate the list with the packing list based on the itinerary.
        If there are multiple number of same items, adjust the quantity field instead of writing the item twice.
        The output should only containt the list in the above format. Do not display any other text and remove ```json from output


        """
        messages = [
        {
            "role": "user",
            "content": list_message,

        }
        ]
        packing_list_str = self.itinerary_service.call_llama_api(messages)
        return packing_list_str


    def create_list_from_itinerary(self, message):
        """
        Send the itinerary message to an external API (e.g., Hugging Face) to generate a packing list.

        Args:
            message (str): Message containing the itinerary and packing list request.

        Returns:
            str: Response containing the generated packing list in JSON format.
        """
        try:
            output = self.itinerary_service.call_llama_api(message)
            return output
        except Exception as e:
            raise PackingListGenerationError(f"Error during API call: {str(e)}")

    