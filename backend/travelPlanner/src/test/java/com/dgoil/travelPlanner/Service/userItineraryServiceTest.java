package com.dgoil.travelPlanner.Service;

import com.dgoil.travelPlanner.Model.DAO.UserDetails;
import com.dgoil.travelPlanner.Model.DAO.UserItinerary;
import com.dgoil.travelPlanner.Model.DTO.AdminStatistics;
import com.dgoil.travelPlanner.Model.DTO.UserTripData;
import com.dgoil.travelPlanner.Model.DTO.UserTripsDetails;
import com.dgoil.travelPlanner.Repository.userItineraryRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class userItineraryServiceTest {

    @Mock
    private userItineraryRepo mockUserItineraryRepo;

    @Mock
    private userDetailsService mockUserDetailsService;

    @InjectMocks
    private userItineraryService userItineraryService;

    private UserItinerary testItinerary;
    private static final String TEST_TRIP_ID = "TB-1234";
    private static final String TEST_EMAIL = "test@example.com";

    @BeforeEach
    void setUp() {
        testItinerary = new UserItinerary();
        testItinerary.setTripID(TEST_TRIP_ID);
        testItinerary.setEmail(TEST_EMAIL);
        testItinerary.setStartDate(LocalDate.now().plusDays(1).toString());
        testItinerary.setEndDate(LocalDate.now().plusDays(7).toString());
        testItinerary.setDestination("Test Destination");
    }

    @Test
    void getUserItinerary_ValidTripId_ShouldReturnItinerary() {
        // Arrange
        when(mockUserItineraryRepo.findByTripID(TEST_TRIP_ID))
                .thenReturn(Optional.of(testItinerary));

        // Act
        Optional<UserItinerary> result = userItineraryService.getUserItinerary(TEST_TRIP_ID);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(TEST_TRIP_ID, result.get().getTripID());
    }

    @Test
    void getUserItinerary_NullTripId_ShouldThrowException() {
        // Act & Assert
        assertThrows(IllegalArgumentException.class,
                () -> userItineraryService.getUserItinerary(null)
        );
    }

    @Test
    void getUserTripData_ExistingTrip_ShouldReturnCompleteData() {
        // Arrange
        UserDetails userDetails = new UserDetails();
        userDetails.setEmail(TEST_EMAIL);

        when(mockUserItineraryRepo.findByTripID(TEST_TRIP_ID))
                .thenReturn(Optional.of(testItinerary));
        when(mockUserDetailsService.getUser(TEST_EMAIL))
                .thenReturn(Optional.of(userDetails));

        // Act
        UserTripData result = userItineraryService.getUserTripData(TEST_TRIP_ID);

        // Assert
        assertEquals(TEST_TRIP_ID, result.getTripId());
        assertEquals(TEST_EMAIL, result.getEmail());
        assertNotNull(result.getUserItinerary());
        assertNotNull(result.getUserDetails());
    }

    @Test
    void saveUserItinerary_NewItinerary_ShouldInsert() {
        // Arrange
        UserItinerary newItinerary = new UserItinerary();
        newItinerary.setTripID("");  // Simulating a new itinerary

        // Act
        userItineraryService.saveUserItinerary(newItinerary);

        // Assert
        verify(mockUserItineraryRepo).insert(any(UserItinerary.class));
        assertNotNull(newItinerary.getTripID());
        assertTrue(newItinerary.getTripID().startsWith("TB-"));
    }

    @Test
    void saveUserItinerary_ExistingItinerary_ShouldUpdate() {
        // Arrange
        when(mockUserItineraryRepo.findByTripID(TEST_TRIP_ID))
                .thenReturn(Optional.of(testItinerary));

        UserItinerary updateItinerary = new UserItinerary();
        updateItinerary.setTripID(TEST_TRIP_ID);
        updateItinerary.setTripDetails(new UserItinerary.TripDetails());

        // Act
        userItineraryService.saveUserItinerary(updateItinerary);

        // Assert
        verify(mockUserItineraryRepo).save(any(UserItinerary.class));
    }

    @Test
    void saveUserItinerary_NonExistingItinerary_ShouldThrowException() {
        // Arrange
        UserItinerary updateItinerary = new UserItinerary();
        updateItinerary.setTripID(TEST_TRIP_ID);

        when(mockUserItineraryRepo.findByTripID(TEST_TRIP_ID))
                .thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(IllegalArgumentException.class,
                () -> userItineraryService.saveUserItinerary(updateItinerary)
        );
    }

    @Test
    void getUserTripDetails_ValidEmail_ShouldReturnDetails() {
        // Arrange
        List<UserItinerary> tripDetails = new ArrayList<>();
        tripDetails.add(testItinerary);

        when(mockUserItineraryRepo.getUserTrips(TEST_EMAIL))
                .thenReturn(tripDetails);

        // Act
        UserTripsDetails result = userItineraryService.getUserTripDetails(TEST_EMAIL);

        // Assert
        assertEquals(TEST_EMAIL, result.getEmail());
        assertNotNull(result.getUpcomingTrips());
    }

    @Test
    void getUserTripDetails_EmptyEmail_ShouldThrowException() {
        // Act & Assert
        assertThrows(IllegalArgumentException.class,
                () -> userItineraryService.getUserTripDetails("")
        );
    }

    @Test
    void convertToReadableDate_ShouldFormatCorrectly() {
        // Arrange
        String inputDate = "2024-01-02";

        // Act
        String formattedDate = userItineraryService.convertToReadableDate(inputDate);

        // Assert
        assertTrue(formattedDate.contains("2nd January 2024"));
    }

    @Test
    void pastTrips_ShouldReturnCount() {
        // Arrange
        List<UserItinerary> pastTrips = Arrays.asList(testItinerary);
        when(mockUserItineraryRepo.getPastTrips(anyString())).thenReturn(pastTrips);

        // Act
        Integer result = userItineraryService.pastTrips();

        // Assert
        assertEquals(1, result);
    }

    @Test
    void upcomingTrips_ShouldReturnCount() {
        // Arrange
        List<UserItinerary> upcomingTrips = Arrays.asList(testItinerary);
        when(mockUserItineraryRepo.getUpcomingTrips(anyString())).thenReturn(upcomingTrips);

        // Act
        Integer result = userItineraryService.upcomingTrips();

        // Assert
        assertEquals(1, result);
    }

    @Test
    void getPopularDestination_ShouldReturnDestinations() {
        // Arrange
        List<AdminStatistics.PopularDestinations> popularDestinations = new ArrayList<>();
        popularDestinations.add(new AdminStatistics.PopularDestinations(1, "Paris"));
        when(mockUserItineraryRepo.getPopularDestination()).thenReturn(popularDestinations);

        // Act
        List<AdminStatistics.PopularDestinations> result = userItineraryService.getPopularDestination();

        // Assert
        assertFalse(result.isEmpty());
        assertEquals("Paris", result.get(0).getDestination());
    }

    // Additional Tests

    @Test
    void saveUserItinerary_InvalidData_ShouldThrowException() {
        // Arrange
        UserItinerary invalidItinerary = new UserItinerary();
        invalidItinerary.setTripID("TB-5678");
        invalidItinerary.setDestination("");  // Invalid destination

        // Act & Assert
        assertThrows(IllegalArgumentException.class,
                () -> userItineraryService.saveUserItinerary(invalidItinerary)
        );
    }

    @Test
    void getUserItinerary_RepositoryFailure_ShouldReturnEmpty() {
        // Arrange
        when(mockUserItineraryRepo.findByTripID(TEST_TRIP_ID))
                .thenThrow(new RuntimeException("Database error"));

        // Act & Assert
        assertThrows(RuntimeException.class,
                () -> userItineraryService.getUserItinerary(TEST_TRIP_ID)
        );
    }

    @Test
    void getPopularDestination_EmptyList_ShouldReturnEmpty() {
        // Arrange
        when(mockUserItineraryRepo.getPopularDestination()).thenReturn(new ArrayList<>());

        // Act
        List<AdminStatistics.PopularDestinations> result = userItineraryService.getPopularDestination();

        // Assert
        assertTrue(result.isEmpty());
    }

    @Test
    void getUserTripDetails_NoTrips_ShouldReturnEmpty() {
        // Arrange
        when(mockUserItineraryRepo.getUserTrips(TEST_EMAIL)).thenReturn(new ArrayList<>());

        // Act
        UserTripsDetails result = userItineraryService.getUserTripDetails(TEST_EMAIL);

        // Assert
        assertTrue(result.getUpcomingTrips().isEmpty());
    }

    @Test
    void saveUserItinerary_InvalidTripID_ShouldThrowException() {
        // Arrange
        UserItinerary invalidItinerary = new UserItinerary();
        invalidItinerary.setTripID("InvalidTripID");  // Invalid format

        // Act & Assert
        assertThrows(IllegalArgumentException.class,
                () -> userItineraryService.saveUserItinerary(invalidItinerary)
        );
    }
}
