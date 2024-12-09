import json
import re
import requests
from datetime import datetime
from ..utils.exceptions import ItineraryGenerationError, DatabaseOperationError
from huggingface_hub import InferenceClient

class ItineraryService:
    """Service for generating and managing travel itineraries."""
    
    def generate_itinerary(self, params):
        """
        Generate a travel itinerary, extract the itinerary from Hugging Face response,
        
        Args:
            params (dict): Itinerary generation parameters
        
        Returns:
            dict: Generated itinerary with MongoDB _id
        """
        try:
            got_message = False
            # Extract parameters with defaults
            if(params.get('message')):
                got_message= True
                message = params.get('message')
            else:
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

            if(got_message):
                response_text = self.create_itinerary_from_message(message)
                response = self.extract_json_from_text_for_message(response_text)
            else:
                response_text = self.get_itinerary(destination, travel_type, budget, start_date, end_date, start_point, note)
                response = self.extract_json_from_text(response_text)
           
            return response

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
            
            # Check if the API response is successful
            if response_data is not None:
                start_point = response_data['data']['userDetails']['location']
                return start_point
            else:
                raise Exception(f"API call failed: {response_data.get('errorMessage', 'Unknown error')}")
        
        except requests.RequestException as e:
            # Handle network-related errors
            raise Exception(f"Network error fetching start point: {str(e)}")
        except (KeyError, ValueError) as e:
            # Handle parsing errors
            raise Exception(f"Error parsing API response: {str(e)}")
         
    def get_itinerary(self, destination="Boston", travel_type="Family", budget=None, start_date="2024-12-24", end_date="2024-12-26", start_point="Amherst", note=""):
        # Handle budget display
        budget_str = f"{budget} USD" if budget else "Not specified"

        # Create the message dynamically using the variables
        messages = [
            {
                "role": "user",
                "content": f"""
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
            }
        ]
        output = self.call_llama_api(messages)
        return output

    def extract_json_from_text(self, text):
        """
        Extract and return the first valid JSON object found in the input text.

        Parameters:
        - text (str): The input text containing JSON.

        Returns:
        - dict: The extracted JSON as a Python dictionary, or None if no valid JSON is found.
        """
        try:
            json_match = re.search(r'{.*}', text, re.DOTALL)
            if json_match:
                json_text = json_match.group(0)
                return json.loads(json_text)  # Convert JSON string to dictionary
        except json.JSONDecodeError as e:
    
            return {"Error": f"{e} AI couldn't recommend"}


    def call_llama_api(self, messages):
        api_key = "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"
        client = InferenceClient(api_key=api_key)
        stream = client.chat.completions.create(
            model="meta-llama/Llama-3.2-3B-Instruct",
            messages=messages,
            temperature=0.5,
            max_tokens=2048,
            top_p=0.7,
            stream=True
        )
        output = ""
        for chunk in stream:
            delta = chunk.choices[0].delta.content
            output += delta
        
        return output


    def create_itinerary_from_message(self, message):
        """
        Creates a travel itinerary based on the provided message input.

        Args:
        - message (str): The message that contains the details for the itinerary.

        Returns:
        - str: The generated travel itinerary.
        """

        # Prepare the message to be sent to the model
        messages = [
        {
            "role": "user",
            "content": message + f"""
            Based on the above details, please generate a detailed travel itinerary. 
            The output should follow this JSON format:

            itinerary: [
                {{
                    "date": "2024-03-30",
                    "day": "Day 1",
                    "activities": [
                        {{ "category": "Travel", "activity": "Travel description, you can add time when to start each and end activity" }},
                        {{ "category": "Hotel", "activity": "Hotel check-in and rest" }},
                        {{ "category": "Adventure", "activity": "Adventure activity description" }},
                        {{ "category": "Sightseeing", "activity": "Second adventure activity description" }}
                    ],
                }},
                {{
                    "date": "2024-03-31",
                    "day": "Day 2",
                    "activities": [
                        {{ "category": "Adventure", "activity": "Adventure activity description"}},
                        {{ "category": "Food", "activity": "Meal description and where"}}
                    ],
                }},
            ],
            "budget": {{
                "activities": "int budget",
                "miscellaneous": "int budget",
                "accommodation": "int budget",
                "food": "int budget",
                "travel": "int budget"
            }}

            Please ensure the following:
            - Include a clear and practical breakdown of expenses for whole trip.
            - Ensure the itinerary includes variety and balances different types of activities (e.g., travel, adventure, food, sightseeing).
            """
        }
        ]

        output = self.call_llama_api(messages)
        return output


    def extract_json_from_text_for_message(self, input_string):
        """
        Extracts and returns a JSON object from a string containing JSON data enclosed in triple backticks.
        
        Args:
            input_string (str): The input string containing JSON data.
        
        Returns:
            dict: A Python dictionary representation of the extracted JSON.
            None: If no valid JSON is found or if there’s a parsing error.
        """
        # Regular expression to extract JSON within ```json
        json_match = re.search(r'```json\n(.*?)\n```', input_string, re.DOTALL)
    
        if json_match:
            json_string = json_match.group(1).strip()
            
            # Fix known issues and wrap in curly brackets
            json_string = '{' + json_string + '}' if not json_string.startswith('{') else json_string
            json_string = json_string.replace('itinerary:', '"itinerary":')
            json_string = re.sub(r',\s*([\]}])', r'\1', json_string)  # Remove trailing commas
            try:
                # Parse and return the JSON object
                return json.loads(json_string)
            except json.JSONDecodeError as e:
                return {"Error": f"Error decoding JSON: {e}"}
        else:
            print("No JSON found in the input string.")
            return {"Error": "No JSON found in the input string."}
