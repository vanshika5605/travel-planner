package com.dgoil.travelPlanner;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableWebMvc
public class TravelPlannerApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		// Access variables
		Dotenv dotenv = Dotenv.load();
		dotenv.entries().forEach(entry -> {
			System.setProperty(entry.getKey(), entry.getValue());
		});
		SpringApplication.run(TravelPlannerApplication.class, args);
	}
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**") // Allow all endpoints
				.allowedOrigins("http://localhost:3000") // Frontend origins
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // HTTP methods
				.allowedHeaders("*") // Allow all headers
				.allowCredentials(true); // Allow cookies/authentication headers
	}
}
