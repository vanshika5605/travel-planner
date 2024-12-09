# Travel Planner
 
![Travel Planner Logo](frontend/public/images/logo.jpeg)

The Travel Planner Application is an AI-powered platform designed to enhance and simplify the travel planning experience. By leveraging the capabilities of Llama-3.2-3B-Instruct, the application curates personalized itineraries, suggests destinations based on user moods, provides a comprehensive packing checklist, and more. It’s designed for users who seek seamless travel planning and for admins who want insights into user behavior and travel trends.

## Video Walkthrough

## Table of Contents
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Admin Dashboard](#admin-dashboard)
- [Usage Instructions](#usage-instructions)
- [AI Models](#ai-models)
- [Contributing](#contributing)

## <a id="key-features"></a> 🚀 Key Features
### **1. Login/SignUp**  
The Login/SignUp functionality ensures a secure and personalized platform for the users. Users can create an account or log in to access tailored travel plans, view trip history, and save itineraries for future reference. The authentication system ensures the data remains protected while enabling seamless access to all features.  


---


### **2. Itinerary Planning**  
Our standout feature, Itinerary Planning, creates customized travel schedules based on the following user inputs:

* Destination
* Duration of trips
* Type of travel group (e.g., solo, couple, family, friends)
* Budget 
* Interests 


Even if the user is unsure about the trip details, they can simply share their mood and any little information they have (e.g., “I want a relaxing getaway” or “I feel adventurous”), and the system will generate an exciting and personalized itinerary for them. 


With a focus on convenience and detail, the itinerary accounts for local attractions, travel distances, weather, and your preferences to ensure an unforgettable experience. The intuitive interface allows real-time editing, providing the flexibility to modify plans as needed.  


---


### **3. Smart Packing Assistant**  
Say goodbye to overpacking or forgetting essentials! The Smart Packing Assistant
* Generates personalized packing lists based on the user’s trip’s destination, duration, activities, and weather conditions. 
* Allows users to customize and manage their packing list within the app.

Users can also effortlessly share or print personalized packing lists. Whether they need to coordinate with travel companions or prefer a hard copy, this feature ensures they are always prepared for the trip.


---


### **4. Trip History**  
Users can relive their adventures with the Trip History feature, which is perfect for referencing previous trips or reusing plans for similar destinations. 
Users can save and access their trips: 
* Past Trips: Review past itineraries. 
* Ongoing Trips: Track the current trip details. 
* Upcoming Trips: Plan future travel with all details saved


---


### **5. Admin Dashboard**  
The Admin Dashboard is designed for efficient platform management. It provides comprehensive tools for managing user accounts, monitoring the system's performance, and overseeing travel data trends. With real-time analytics and an intuitive interface, admins can ensure a smooth experience for all users while continuously improving the platform. The dashboard displays:
* Total Number of Users 
* Number of New Users 
* Number of upcoming and past trips 
* Popular Travel Months 
* Popular Destinations 
* Heatmap of Travelers per Country


---


### **6. Travel Planning Essentials**
The Travel Planner brings together practical tools to enhance the travel planning experience. It includes:
* A Long Weekend Calculator which highlights weekends and long weekends. This makes it easier to spot the perfect time for a getaway without having to juggle multiple schedules. 
* An Interactive Quiz which is a fun and engaging quiz that helps users discover their travel style (e.g., Adventure Seeker, Relaxation Enthusiast, Cultural Explorer). This feature not only helps users learn more about their preferences but also allows the website to tailor its itinerary suggestions to their unique travel style, ensuring every trip feels custom-made. 
* A Currency Exchange calculator that easily converts one currency to another with our built-in currency exchange feature. It uses real-time exchange rates to provide accurate conversions, making international travel planning smoother.  


## <a id="tech-stack"></a>  🛠 Tech Stack
- **Frontend:** React
- **Backend:** SpringBoot
- **Database:** MongoDB
- **Cloud Storage:** AWS S3
- **AI Integration:** LLM - Llama-3.2-3B-Instruct

## <a id="setup-instructions"></a>  🔧 Setup Instructions
To get the project up and running locally, follow these steps:

### **Prerequisites**
- Node.js and npm for the React frontend
- JDK 17 and Python 3 for the backend
- MongoDB for the database

### **Clone the Repository**
```
git clone https://github.com/vanshika5605/travel-planner.git
cd travel-planner
```
### **Setting Up the Backend (SprintBoot)** 
Navigate to the backend directory:
```
cd backend\travelPlanner
```
Set Environment Variables <br>
Create a .env file in the this directory with the following variables:
```
MONGODB_URI=your_database_url
DATABASE_NAME=your_database_name
```
Now, navigate to IntelliJ and start the backend from TravelPlannerApplication class. Optionally, start the project from command line:
```
cd /travel-planner //Navigate to the Project Directory
mvn clean install //Clean and Build the Project
mvn spring-boot:run //Run the Application
```

### **Setting Up the Backend (Flask)** 
Navigate to the ai-recommender-new directory:
```
cd ai-recommender-new
```
Set Environment Variables<br>
Create a .env file in the this directory with the following variables:
```
FLASK_ENV=development
HUGGINGFACE_API_KEY=<your-token>
```
Install the Python dependencies:
```
pip install -r requirements.txt
```
Start the Flask server on port 5050: 
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

### **Setting Up the Frontend (React)**
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
### **Access the Application**
Open a browser and navigate to http://localhost:3000 to access the frontend.

## <a id="admin-dashboard"></a>  📊 Admin Dashboard
Log in as an administrator using the credentials email = admin@umass.edu and password = Test@123.
Navigate to /admin to access the dashboard and monitor user activity.

##  <a id="usage-instructions"></a> 📖 Usage Instructions
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

##  <a id="ai-models"></a> AI Models
- This project leverages the Llama 3.2-3B-Instruct AI model from Hugging Face for generating travel itineraries and packing lists.
- The AI models are accessed via API calls and are hosted on Hugging Face's infrastructure, ensuring accurate and efficient outputs.
- Model name: meta-llama/Llama-3.2-3B-Instruct
- Purpose: Used for text generation tasks such as creating itineraries and packing lists based on user inputs.
- Integration: The model is integrated using Hugging Face's Inference API
  
## <a id="contributing"></a>  🤝 Contributing
We welcome contributions from the community! To contribute:

- Fork the repository.
- Create a new feature branch (git checkout -b feature/new-feature).
- Commit your changes (git commit -m "Add new feature").
- Push to the branch (git push origin feature/new-feature).
- Open a Pull Request.

Happy Travels! 🌍✈️
