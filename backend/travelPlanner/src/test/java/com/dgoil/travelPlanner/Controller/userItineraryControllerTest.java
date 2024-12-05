package com.dgoil.travelPlanner.Controller;

import com.dgoil.travelPlanner.Model.DAO.UserItinerary;
import com.dgoil.travelPlanner.Model.DTO.ApiResponse;
import com.dgoil.travelPlanner.Model.DTO.UserTripData;
import com.dgoil.travelPlanner.Model.DTO.UserTripsDetails;
import com.dgoil.travelPlanner.Service.userItineraryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class userItineraryControllerTest {

    @Mock
    private userItineraryService myUserItineraryService;

    @InjectMocks
    private userItineraryController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetUserItinerary_Successful() {
        // Arrange
        String tripId = "trip123";
        UserItinerary mockItinerary = new UserItinerary();
        mockItinerary.setTripID(tripId);
        mockItinerary.setDestination("Paris");

        when(myUserItineraryService.getUserItinerary(tripId))
                .thenReturn(Optional.of(mockItinerary));

        // Act
        ResponseEntity<ApiResponse<Optional<UserItinerary>>> response = userController.getUserItinerary(tripId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().isSuccess());
        assertTrue(response.getBody().getData().isPresent());
        assertEquals(tripId, response.getBody().getData().get().getTripID());
        verify(myUserItineraryService).getUserItinerary(tripId);
    }

    @Test
    void testGetUserItinerary_NotFound() {
        // Arrange
        String tripId = "nonexistentTrip";

        when(myUserItineraryService.getUserItinerary(tripId))
                .thenReturn(Optional.empty());

        // Act
        ResponseEntity<ApiResponse<Optional<UserItinerary>>> response = userController.getUserItinerary(tripId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertFalse(response.getBody().isSuccess());
        assertEquals("No itinerary found for tripID: " + tripId, response.getBody().getErrorMessage());
        verify(myUserItineraryService).getUserItinerary(tripId);
    }

    @Test
    void testGetUserItinerary_Exception() {
        // Arrange
        String tripId = "invalidTrip";

        when(myUserItineraryService.getUserItinerary(tripId))
                .thenThrow(new IllegalArgumentException("Invalid trip ID"));

        // Act
        ResponseEntity<ApiResponse<Optional<UserItinerary>>> response = userController.getUserItinerary(tripId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertFalse(response.getBody().isSuccess());
        assertEquals("Invalid trip ID", response.getBody().getErrorMessage());
        verify(myUserItineraryService).getUserItinerary(tripId);
    }

    @Test
    void testGetUserTripData_Successful() {
        // Arrange
        String tripId = "trip123";
        UserTripData mockTripData = new UserTripData();

        when(myUserItineraryService.getUserTripData(tripId))
                .thenReturn(mockTripData);

        // Act
        ResponseEntity<ApiResponse<UserTripData>> response = userController.getUserTripData(tripId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertFalse(response.getBody().isSuccess()); // Note: This seems to be intentional in the original code
        assertEquals(mockTripData, response.getBody().getData());
        verify(myUserItineraryService).getUserTripData(tripId);
    }

    @Test
    void testSaveUserItinerary_Successful() {
        // Arrange
        UserItinerary userItinerary = new UserItinerary();
        userItinerary.setTripID("trip123");
        userItinerary.setDestination("Paris");

        doNothing().when(myUserItineraryService).saveUserItinerary(userItinerary);

        // Act
        ResponseEntity<ApiResponse<String>> response = userController.saveUserItinerary(userItinerary);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().isSuccess());
        assertEquals("Itinerary added!", response.getBody().getData());
        verify(myUserItineraryService).saveUserItinerary(userItinerary);
    }

    @Test
    void testSaveUserItinerary_Exception() {
        // Arrange
        UserItinerary userItinerary = new UserItinerary();
        userItinerary.setTripID("trip123");

        doThrow(new IllegalArgumentException("Invalid itinerary data"))
                .when(myUserItineraryService).saveUserItinerary(userItinerary);

        // Act
        ResponseEntity<ApiResponse<String>> response = userController.saveUserItinerary(userItinerary);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertFalse(response.getBody().isSuccess());
        assertEquals("Invalid itinerary data", response.getBody().getErrorMessage());
        verify(myUserItineraryService).saveUserItinerary(userItinerary);
    }

    @Test
    void testUserTripDetails_Successful() {
        // Arrange
        String email = "user@example.com";
        UserTripsDetails mockUserTripsDetails = new UserTripsDetails();

        when(myUserItineraryService.getUserTripDetails(email))
                .thenReturn(mockUserTripsDetails);

        // Act
        ResponseEntity<ApiResponse<UserTripsDetails>> response = userController.userTripDetails(email);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().isSuccess());
        assertEquals(mockUserTripsDetails, response.getBody().getData());
        verify(myUserItineraryService).getUserTripDetails(email);
    }

    @Test
    void testUserTripDetails_Exception() {
        // Arrange
        String email = "user@example.com";

        when(myUserItineraryService.getUserTripDetails(email))
                .thenThrow(new IllegalArgumentException("User not found"));

        // Act
        ResponseEntity<ApiResponse<UserTripsDetails>> response = userController.userTripDetails(email);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertFalse(response.getBody().isSuccess());
        assertEquals("User not found", response.getBody().getErrorMessage());
        verify(myUserItineraryService).getUserTripDetails(email);
    }
}