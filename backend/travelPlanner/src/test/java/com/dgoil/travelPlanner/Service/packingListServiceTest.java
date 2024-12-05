package com.dgoil.travelPlanner.Service;

import com.dgoil.travelPlanner.Model.DAO.PackingList;
import com.dgoil.travelPlanner.Model.DAO.UserItinerary;
import com.dgoil.travelPlanner.Repository.packingListRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class packingListServiceTest {

    @Mock
    private packingListRepo mockPackingListRepo;

    @Mock
    private userItineraryService mockUserItineraryService;

    @InjectMocks
    private packingListService packingListService;

    private PackingList testPackingList;
    private UserItinerary testUserItinerary;
    private static final String TEST_TRIP_ID = "trip123";

    @BeforeEach
    void setUp() {
        // Create test data
        testPackingList = new PackingList();
        testPackingList.setTripID(TEST_TRIP_ID);

        testUserItinerary = new UserItinerary();
        testUserItinerary.setTripID(TEST_TRIP_ID);
    }

    @Test
    void saveList_NewPackingList_ShouldInsert() {
        // Arrange
        when(mockPackingListRepo.getByTripId(TEST_TRIP_ID)).thenReturn(Optional.empty());
        when(mockUserItineraryService.getUserItinerary(TEST_TRIP_ID)).thenReturn(Optional.of(testUserItinerary));

        // Act
        packingListService.saveList(testPackingList);

        // Assert
        verify(mockPackingListRepo).insert(testPackingList);
        verify(mockUserItineraryService).saveUserItinerary(argThat(
                itinerary -> itinerary.getIsPackingListCreated() == Boolean.TRUE
        ));
    }

    @Test
    void saveList_ExistingPackingList_ShouldUpdate() {
        // Arrange
        PackingList existingPackingList = new PackingList();
        existingPackingList.set_id("existingId");
        existingPackingList.setTripID(TEST_TRIP_ID);

        when(mockPackingListRepo.getByTripId(TEST_TRIP_ID)).thenReturn(Optional.of(existingPackingList));
        when(mockUserItineraryService.getUserItinerary(TEST_TRIP_ID)).thenReturn(Optional.of(testUserItinerary));

        // Act
        packingListService.saveList(testPackingList);

        // Assert
        verify(mockPackingListRepo).save(testPackingList);
        assertEquals("existingId", testPackingList.get_id());
    }

    @Test
    void saveList_NoUserItinerary_ShouldNotUpdateItinerary() {
        // Arrange
        when(mockPackingListRepo.getByTripId(TEST_TRIP_ID)).thenReturn(Optional.empty());
        when(mockUserItineraryService.getUserItinerary(TEST_TRIP_ID)).thenReturn(Optional.empty());

        // Act
        packingListService.saveList(testPackingList);

        // Assert
        verify(mockPackingListRepo).insert(testPackingList);
        verify(mockUserItineraryService, never()).saveUserItinerary(any());
    }

    @Test
    void getList_ExistingPackingList_ShouldReturn() {
        // Arrange
        when(mockPackingListRepo.getByTripId(TEST_TRIP_ID)).thenReturn(Optional.of(testPackingList));

        // Act
        PackingList retrievedList = packingListService.getList(TEST_TRIP_ID);

        // Assert
        assertNotNull(retrievedList);
        assertEquals(TEST_TRIP_ID, retrievedList.getTripID());
    }

    @Test
    void getList_NonExistingPackingList_ShouldThrowException() {
        // Arrange
        when(mockPackingListRepo.getByTripId(TEST_TRIP_ID)).thenReturn(Optional.empty());

        // Act & Assert
        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> packingListService.getList(TEST_TRIP_ID)
        );

        // Verify the exception message
        assertTrue(exception.getMessage().contains(TEST_TRIP_ID));
    }
}