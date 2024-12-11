# Contributions

## 1. Anusha Agrawal

#### API Development
- Developed the Packing List API to dynamically generate packing lists tailored to user-specific itineraries and details.
- Implemented functionality to fetch itineraries from a backend API that stores user details and generated itineraries.
- Designed and sent requests to the Llama 3.2 model on Hugging Face, using a custom prompt to generate practical packing lists.
- Constructed a detailed custom prompt to ensure the packing list includes - Essential documents, Clothing, Toiletries, Personal essentials, Medicines and first aid, Electronics and Miscellaneous items
- Ensured the response was formatted in JSON and adhered to predefined data structure requirements
  
#### Testing
- Wrote comprehensive test cases for the itinerary and packing list services with a coverage of 53% and 72% respectively, ensuring functionality and robustness.
- Simulated API responses and validated the expected itinerary and packing list outputs against user inputs.
- Handled edge cases such as invalid JSON and unexpected exceptions.
- Mocked external dependencies (e.g., Hugging Face API calls) for isolated and reliable testing.
- Validated that the packing list output was consistent with the itinerary and user preferences.
- Achieved significant code coverage for both generate_itinerary and generate_packing_list services.


## 2. Fabeha Fatima

- Integrated the Llama-3.2-3B-Instruct model using the Hugging Face Inference API to power itinerary generation and packing lists.
- Conducted research on user needs, travel trends, and AI applications for itinerary and packing assistance. Optimized and tested AI outputs to ensure alignment with user expectations, including improving prompt designs for better results.
- Implemented AI-powered features for generating personalized itineraries based on user inputs (destination, duration, mood, etc.).
- Designed the Smart Packing Assistant to create tailored packing lists based on destination, activities, and weather.
- Worked on the "ai-recommender-new" project, where she set up the Flask API from scratch, ensuring it followed a modular structure. Created three APIs:
  1. Two variants for the itinerary creation API (`http://127.0.0.1:5050/api/v1/itinerary/create`):
     - One variant requires only a message from the user to generate the itinerary (e.g., "I want to plan a trip by the water for about 3 days near Goa India, my budget is 900 USD").
     - The second variant requires detailed information, including travel type, budget, start and end dates, and a note (e.g., "travel_type": "Business", "budget": 500, "start_date": "2025-01-07", "end_date": "2025-01-09", "note": "My trip to Madrid is important because I want to explore the culture and cuisine").
  2. Created another API (`http://127.0.0.1:5050/api/v1/packingList/create`) for generating packing lists for any saved itinerary.
- Optimized and tested AI outputs to ensure alignment with user expectations, including improving prompt designs for better results.


## 3. Mustafa Ali

#### **Backend Development**
 
1. **Layered Architecture Implementation**  
   - Established a well-organized layered architecture, creating Controller, Service, and Repository layers to promote scalability and maintainability.  
   - Designed and implemented 16 highly efficient and modular RESTful APIs for smooth interaction with the frontend.  

2. **Error Handling and Logging**  
   - Integrated comprehensive error handling mechanisms to gracefully manage exceptions, enhancing system stability.  
   - Implemented structured logging with dynamic log levels, enabling effective monitoring and debugging across environments.  

3. **Code Documentation and Readability**  
   - Wrote extensive inline comments and method-level documentation, improving code readability and maintainability for future developers.  
   - Adhered to clean code principles and followed consistent naming conventions.  

4. **Unit Testing and Code Coverage**  
   - Authored 55 robust unit tests using JUnit and Mockito, achieving **86% code coverage**, ensuring the reliability and quality of the backend codebase.  
   - Conducted regular test-driven development (TDD) cycles, identifying and fixing potential issues early in the development lifecycle.  


#### **Database Design and Implementation**

1. **Schema Design**  
   - Designed normalized and optimized schemas for various collections, such as `featuresList`, `packingList`, `userDetails`, and `userItinerary`, to efficiently store and retrieve data.  
   - Established relationships and indexing strategies to enable faster query execution.  

2. **Data Population**  
   - Populated database collections with meaningful and well-structured sample data for development, testing, and demonstration purposes.  

3. **Advanced Querying and Aggregation**  
   - Developed complex MongoDB queries and aggregation pipelines to handle data analytics and reporting requirements.  
   - Ensured query efficiency through proper indexing and query optimization techniques.  

4. **AWS S3 Integration for Static Assets**  
   - Integrated AWS S3 for storing and managing static images, ensuring rapid retrieval and reducing database load.  
   - Designed the architecture to handle seamless integration between MongoDB and AWS S3 for file references and metadata.  



## 4. Vanshika Agrawal


#### Research and Design: 
- Conducted extensive research on modern UI/UX design trends using platforms like Dribbble etc to ensure an intuitive and visually appealing user interface.
- Developed detailed wireframes with comprehensive color schemes and interactive prototypes for all application screens, enabling clear communication with instructors, peers, and developers.

#### Feature Development (UI + Integration):
- **Authentication System:** Designed and implemented the complete login and sign-up feature, including form validation, error handling, and secure API integration.
- **Landing Page:** Built and integrated a fully responsive landing page with dynamic content, ensuring cross-browser and mobile compatibility.
- **Plan an Itinerary:** Developed a comprehensive itinerary planning feature with interactive UI elements, enabling users to save itineraries for future reference, add personalized notes, and easily copy itineraries for reuse or sharing with fellow travelers.
- **Smart Packing Assistant:** Built an intelligent packing assistant that generates personalized packing lists based on user preferences, trip duration, and weather conditions. Strengthened the feature by enabling users to print and share packing lists, while also tracking items already packed to reduce last-minute stress.
- **Travel Planning Essentials:** Expanded the feature set by adding a long weekend calculator, a travel style quiz, and a currency converter, helping users better prepare for trips. Sourced and integrated public APIs to fetch relevant travel data, ensuring accurate and up-to-date information.


#### Quality Assurance:
- Wrote comprehensive unit tests using Jest and React Testing Library, achieving approximately 55% test coverage across key application components.
- Implemented robust error handling strategies, ensuring the application gracefully manages server failures, form validation errors, and network issues.


## 5. Devyani Goil

#### <ins> Backend </ins>
- **Spring Boot Application Setup** - Set up the core Spring Boot application for the backend, enabling a robust foundation for development.
- **Integrated CORS** - Configured Cross-Origin Resource Sharing (CORS) to facilitate smooth communication between the backend and frontend, resolving issues related to restricted resource access.
- **Layered Architecture Implementation** - Implemented a clean layered architecture, separating concerns into distinct layers such as controller, service, and repository for better scalability and maintainability.
- **Documentation and Comments** - Added detailed documentation and in-line comments across the backend codebase to ensure clarity and ease of understanding for future development.


#### <ins> Database </ins>
- **MongoDB Setup** - Installed and configured MongoDB to serve as the database for the application.
- **Schema Design** - Designed the database schema to support efficient storage and retrieval of application data.


#### <ins> Frontend </ins>
- **Designed the Admin Page** - Created an admin dashboard displaying key user statistics, such as total number of users, number of upcoming trips, heatmap visualizing the distribution of users across countries. Integrated the dashboard with backend APIs for real-time data visualization.
- **Designed the User Profile Page** - Developed the user profile page to showcase user details and trip history, user-specific statistics. Integrated the page with appropriate backend APIs to fetch and display the required data.


## General Contributions

- Conceptualized and refined the idea of an AI-powered travel planner.
- Discussed and planned the architecture of the application.
- Designed and implemented core platform features, ensuring seamless integration between frontend, backend, and AI models.
- Collaborated on testing, debugging, and optimizing the overall application to enhance user experience and performance.
