package com.dgoil.travelPlanner;

import io.github.cdimascio.dotenv.Dotenv;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.SpringApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.verify;

class TravelPlannerApplicationTests {

	@Test
	void testMainMethod() {
		// Mock Dotenv and SpringApplication
		try (var dotenvMock = mockStatic(Dotenv.class);
			 var springAppMock = mockStatic(SpringApplication.class)) {

			// Mock Dotenv behavior
			Dotenv dotenv = Mockito.mock(Dotenv.class);
			dotenvMock.when(Dotenv::load).thenReturn(dotenv);
			Mockito.when(dotenv.entries()).thenReturn(java.util.Collections.emptySet());

			// Act
			TravelPlannerApplication.main(new String[]{});

			// Assert that Dotenv.load() was called
			dotenvMock.verify(Dotenv::load);
			// Assert that SpringApplication.run() was called with the correct arguments
			springAppMock.verify(() -> SpringApplication.run(TravelPlannerApplication.class, new String[]{}));
		}
	}
}
