import requests
import json
from dotenv import load_dotenv
import os
from flask import jsonify,request
# from huggingface_hub import InferenceClient
import json
import re

class HuggingFaceClient:
    def __init__(self, api_token, model):
        """
        Initialize the Hugging Face client.
        
        :param api_token: Your Hugging Face API token
        :param model: The name of the model to use, e.g., "meta-llama/Llama-3.2-3B-Instruct"
        """
        self.api_url = f"https://api-inference.huggingface.co/models/{model}"
        self.headers = {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json"
        }
    def check_api_availability(self):
        """
        Check if the Hugging Face API is reachable.
        :return: True if available, False otherwise.
        """
        try:
            response = requests.get(self.api_url, headers=self.headers)
            if response.status_code == 200:
                return True
            else:
                print(f"API responded with status code {response.status_code}.")
                return False
        except requests.exceptions.RequestException as e:
            print(f"Error checking API availability: {e}")
            return False
    def chat_completion(self, messages, temperature=0.5, max_tokens=2048, top_p=0.7, stream=True):
        """
        Make a streaming chat completion request to the model.
        :param messages: A list of messages in the chat history
        :param temperature: Sampling temperature
        :param max_tokens: Maximum number of tokens in the response
        :param top_p: Nucleus sampling parameter
        :param stream: Whether to use streaming responses
        :return: Generator yielding streamed responses
        """

        
        messages=str(messages)
        payload = {
            "inputs":  messages,
            "parameters": {
                "temperature": temperature,
                "max_tokens": max_tokens,
                "top_p": top_p,
                "stream": stream
            }
        }
        try:
            response = requests.post(self.api_url, headers=self.headers, json=payload, stream=stream)
            print("HEYYYY")
            print(type(response.json()))
            print("HEYYYY2")
            print(response.text)

        except requests.exceptions.RequestException as e:
            print(f"Error during the API request: {e}")
            return None
        
if __name__ == "__main__":
    # Load API key from .env file
    load_dotenv()
    API_TOKEN = os.getenv("HUGGINGFACE_API_KEY")
    if not API_TOKEN:
        raise ValueError("HUGGINGFACE_API_KEY not found in environment variables or .env file.")
    
    MODEL = "meta-llama/Llama-3.2-3B-Instruct"
    
    # Initialize the client
    client = HuggingFaceClient(API_TOKEN, MODEL)
    
    # Check if the API is available
    if not client.check_api_availability():
        print("Hugging Face API is not available. Exiting...")
    else:
        # Example chat messages
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Can you help me with my itinerary?"}
        ]
        
        # Stream responses from the model
        try:
            for response in client.chat_completion(messages):
                if response:
                    print(response)
        except Exception as e:
            print(f"Error: {e}")
