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

#### **AI Integration and Model Utilization:**
- Integrated the **Llama-3.2-3B-Instruct** model via the **Hugging Face Inference API**, enabling the generation of both personalized itineraries and packing lists.
- Conducted extensive research on user needs, travel preferences, and AI use cases, optimizing prompt designs to ensure AI outputs align with user expectations, resulting in more accurate, context-aware responses.
- Implemented a **Smart Itinerary Generation System**, utilizing AI to craft personalized travel plans based on user inputs such as destination, travel style, duration, and budget. This system adapts to specific travel preferences, creating dynamic and tailored itineraries.
- Developed the **AI-Powered Smart Packing Assistant**, using real-time data inputs (weather, destination, activities) to create packing lists, ensuring users are fully prepared for their trips.
  
#### **API Development:**
- Spearheaded the development of the **Flask API** architecture, ensuring it adhered to a modular and scalable structure. Created a suite of APIs to seamlessly integrate with the frontend and backend systems:
  1. Developed two variants of the **itinerary creation API** (`http://127.0.0.1:5050/api/v1/itinerary/create`):
     - One variant requires minimal input from users (e.g., a brief message about the trip, such as “Plan a 3-day trip near Goa, India, budget 900 USD”).
     - The second variant allows users to provide detailed trip information, such as travel type, budget, start and end dates, and special notes, enhancing the AI's ability to tailor the itinerary to specific needs.
  2. Designed and developed the **packing list API** (`http://127.0.0.1:5050/api/v1/packingList/create`), which generates packing lists based on any saved itinerary, factoring in activities, weather, and destination-specific requirements.

#### **Optimization and Testing:**
- Continuously optimized AI outputs to improve response quality, leveraging prompt engineering to generate more accurate, context-sensitive itineraries and packing suggestions.
- Implemented rigorous **AI output testing**, ensuring responses are coherent, contextually appropriate, and adhere to user preferences. Enhanced the model's adaptability by refining prompt structures based on iterative feedback.


## 3. Mustafa Ali

#### **Backend Development**

- **Layered Architecture Implementation**: Established a well-organized layered architecture in Springboot, creating Controller, Service, and Repository layers to promote scalability and maintainability. Designed and implemented 16 highly efficient and modular RESTful APIs for smooth interaction with the frontend.

- **Error Handling and Logging**: Integrated comprehensive error handling mechanisms to gracefully manage exceptions, enhancing system stability. Implemented structured logging with dynamic log levels, enabling effective monitoring and debugging across environments.

- **Code Documentation and Readability**: Wrote extensive inline comments and method-level documentation, improving code readability and maintainability for future developers. Adhered to clean code principles and followed consistent naming conventions.

- **Unit Testing and Code Coverage**: Authored 55 robust unit tests using JUnit and Mockito, achieving **90% code coverage**, ensuring the reliability and quality of the backend codebase. Conducted regular test-driven development (TDD) cycles, identifying and fixing potential issues early in the development lifecycle.

#### **Database Design and Implementation**

- **Schema Design**: Designed normalized and optimized schemas for various collections in MongoDB, such as `featuresList`, `packingList`, `userDetails`, and `userItinerary`, to efficiently store and retrieve data. Established relationships and indexing strategies to enable faster query execution.

- **Data Population**: Populated database collections with meaningful and well-structured sample data for development, testing, and demonstration purposes.

- **Advanced Querying and Aggregation**: Developed complex MongoDB queries and aggregation pipelines to handle data analytics and reporting requirements. Ensured query efficiency through proper indexing and query optimization techniques.

- **AWS S3 Integration for Static Assets**: Integrated AWS S3 for storing and managing static images, ensuring rapid retrieval and reducing database load. Designed the architecture to handle seamless integration between MongoDB and AWS S3 for file references and metadata.


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

#### <ins> Frontend </ins>
- **Designed the Admin Page** - Created an admin dashboard displaying key user statistics, such as total number of users, number of upcoming trips, heatmap visualizing the distribution of users across countries. Integrated the dashboard with backend APIs for real-time data visualization.
- **Designed the User Profile Page** - Developed the user profile page to showcase user details and trip history, user-specific statistics. Integrated the page with appropriate backend APIs to fetch and display the required data.

#### <ins> Backend </ins>
- **Spring Boot Application Setup** - Set up the core Spring Boot application for the backend, enabling a robust foundation for development.
- **Integrated CORS** - Configured Cross-Origin Resource Sharing (CORS) to facilitate smooth communication between the backend and frontend, resolving issues related to restricted resource access.
- **Layered Architecture Implementation** - Implemented a clean layered architecture, separating concerns into distinct layers such as controller, service, and repository for better scalability and maintainability.
- **Documentation and Comments** - Added detailed documentation and in-line comments across the backend codebase to ensure clarity and ease of understanding for future development.

#### <ins> Database </ins>
- **MongoDB Setup** - Set up a MongoDB database environment from scratch, including installation, configuration, and integration with the backend. Implemented secure database connection settings, including authentication and SSL.
- **Schema Design** - Designed normalized and optimized schemas for various collections, such as featuresList, packingList, userDetails, and userItinerary, to efficiently store and retrieve data. Established relationships and indexing strategies to enable faster query execution.


## General Contributions

- Conceptualized and refined the idea of an AI-powered travel planner.
- Discussed and planned the architecture of the application.
- Designed and implemented core platform features, ensuring seamless integration between frontend, backend, and AI models.
- Collaborated on testing, debugging, and optimizing the overall application to enhance user experience and performance.
