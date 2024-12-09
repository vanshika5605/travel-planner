package com.dgoil.travelPlanner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import io.github.cdimascio.dotenv.Dotenv;

/**
 * Entry point for the Travel Planner application.
 * Configures application startup, environment variables, and CORS settings.
 */
@SpringBootApplication // Marks this class as the main Spring Boot application.
@EnableWebMvc // Enables Web MVC configuration for the application.
public class TravelPlannerApplication implements WebMvcConfigurer {
	/**
     * The main method to launch the Spring Boot application.
     * Loads environment variables using the Dotenv library and sets them as system properties.
     * 
     * @param args Command-line arguments (optional).
     */
	public static void main(String[] args) {
		// Load environment variables from a .env file using the Dotenv library.
		Dotenv dotenv = Dotenv.load();
		// Set environment variables as system properties for application-wide access.
		dotenv.entries().forEach(entry -> {
			System.setProperty(entry.getKey(), entry.getValue());
		});
		// Launch the Spring Boot application.
		SpringApplication.run(TravelPlannerApplication.class, args);
	}

	/**
     * Configures CORS (Cross-Origin Resource Sharing) settings for the application.
     * Allows the frontend application to communicate with the backend.
     * 
     * @param registry CorsRegistry to define CORS mappings.
     */
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**") // Allow all endpoints
				.allowedOrigins("http://localhost:3000") // Frontend origins
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // HTTP methods
				.allowedHeaders("*") // Allow all HTTP headers
				.allowCredentials(true); // Allow credentials like cookies and authentication headers.
	}
}
