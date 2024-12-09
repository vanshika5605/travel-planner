# Travel Planner
 
![Travel Planner Logo](frontend/public/images/logo.jpeg)

The Travel Planner Application is an AI-powered platform designed to enhance and simplify the travel planning experience. By leveraging the capabilities of Llama-3.2-3B-Instruct, the application curates personalized itineraries, suggests destinations based on user moods, provides a comprehensive packing checklist, and more. It’s designed for users who seek seamless travel planning and for admins who want insights into user behavior and travel trends.

### Video Walkthrough

### Table of Contents
- Key Features
- Tech Stack
- Setup Instructions
- Admin Dashboard
- Usage Instructions
- AI Models
- Contributing

### 🚀 Key Features
**1. Personalized Itinerary Generator**
Users can fill out a form specifying their preferences such as:
- Destination
- Dates of Travel
- Budget
- Travel Group Type (e.g., solo, couple, family, friends)

The application generates a customized travel itinerary based on these inputs.

**2. Mood-Based Travel Suggestions**
If a user is unsure about where to go, they can share their mood, preferences, or thoughts (e.g., “I want a relaxing getaway” or “I feel adventurous”). The application suggests destinations and activities that align with the user’s input.

**3. Packing List Generator**
- Generates a checklist of items to pack based on the travel destination, duration, season, and group type.
- Users can customize and manage their packing list within the app.

**4. Trip Management**
Users can save and access their trips:
- Past Trips: Review past itineraries.
- Ongoing Trips: Track the current trip details.
- Upcoming Trips: Plan future travel with all details saved.

**5. Interactive Travel Style Quiz**
A fun and engaging quiz that helps users discover their travel style (e.g., Adventure Seeker, Relaxation Enthusiast, Cultural Explorer). Based on quiz results, the app provides tailored travel suggestions.

**6. Currency Converter**
- Converts currencies in real-time based on the user’s travel destination.
- Helps users plan their budget effectively with accurate currency conversion rates.

**7. Long Weekend Calculator**
- Displays long weekends month wise to keep the users updated of the upcoming holidays.
  
**8. Admin Dashboard**
- A comprehensive dashboard for administrators to monitor user statistics:
- Total Number of Users
- Number of New Users
- Number of upcoming and past trips
- Popular Travel Months
- Popular Destinations
- Heatmap of Travelers per Country

### 🛠 Tech Stack
- **Frontend:** React
- **Backend:** SpringBoot
- **Database:** MongoDB
- **Cloud Storage:** AWS S3
- **AI Integration:** LLM - Llama-3.2-3B-Instruct

### 🔧 Setup Instructions
To get the project up and running locally, follow these steps:

**Prerequisites**
- Node.js and npm for the React frontend
- JDK 23 for the backend
- MongoDB for the database

**Clone the Repository**
```
git clone https://github.com/vanshika5605/travel-planner.git
cd travel-planner
```
**Setting Up the Backend (SprintBoot)** 
Navigate to the backend directory:
```
cd backend
```
Now, navigate to IntelliJ and start the backend from TravelPlannerApplication class. Optionally, start the project from command line:
```
cd /travel-planner //Navigate to the Project Directory
mvn clean install //Clean and Build the Project
mvn spring-boot:run //Run the Application
java -jar //target/travel-planner
```

**Setting Up the Backend (Flask)** 
Navigate to the ai-recommender-new directory:
```
cd ai-recommender-new
```
Install the Python dependencies:
```
pip install -r requirements.txt
```
Start the Flask server(By default runs the app on port 5000): 
```
flask run
```
On MacOs, port 5000 is occupied with some other process. So run the backend on MacOs on a port other than 5000. Use the following command to run the backend on port 5050:
```
flask run --port 5050
```
if the flask commmand does not work on local terminal, create a python virtual environment and download and run flask application:
```
python3 -m venv path/to/venv
source path/to/venv/bin/activate
pip3 install flask
flask run --port 5050
```

**Setting Up the Frontend (React)**
Navigate to the frontend directory:
```
cd frontend
```
**Install the npm dependencies:**
```
npm install
```
**Start the React development server:**
```
npm start
```

**Set Environment Variables**
Create a .env file in the backend directory with the following variables:
```
FLASK_ENV=development
HUGGINGFACE_API_KEY='<your-token>'
MONGODB_URI=your_database_url
DATABASE_NAME=your_database_name
```
**Access the Application**
Open a browser and navigate to http://localhost:3000 to access the frontend.

### 📊 Admin Dashboard
Log in as an administrator using the credentials email = admin@umass.edu and password = Test@123.
Navigate to /admin to access the dashboard and monitor user activity.

### 📖 Usage Instructions
**For Users**
- Sign Up / Log In to the platform.
- Find out the best long weekend that works out for you using our long weekend calendar.
- Fill Out the Travel Form or Share Your Mood for personalized recommendations.
- View and Manage Trips (past, ongoing, and upcoming).
- Access the Packing List and make necessary customizations.
- Take the Travel Style Quiz to discover your travel personality.
- Use the Currency Converter to calculate budgets.

**For Admins**
- Access the Admin Dashboard for a detailed overview of user engagement and travel trends.

### AI Models
- This project leverages the Llama 3.2-3B-Instruct AI model from Hugging Face for generating travel itineraries and packing lists.
- The AI models are accessed via API calls and are hosted on Hugging Face's infrastructure, ensuring accurate and efficient outputs.
- Model name: meta-llama/Llama-3.2-3B-Instruct
- Purpose: Used for text generation tasks such as creating itineraries and packing lists based on user inputs.
- Integration: The model is integrated using Hugging Face's Inference API
  
### 🤝 Contributing
We welcome contributions from the community! To contribute:

- Fork the repository.
- Create a new feature branch (git checkout -b feature/new-feature).
- Commit your changes (git commit -m "Add new feature").
- Push to the branch (git push origin feature/new-feature).
- Open a Pull Request.

Happy Travels! 🌍✈️
