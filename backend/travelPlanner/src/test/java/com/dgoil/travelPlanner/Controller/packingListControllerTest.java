package com.dgoil.travelPlanner.Controller;

import com.dgoil.travelPlanner.Model.DAO.PackingList;
import com.dgoil.travelPlanner.Model.DTO.ApiResponse;
import com.dgoil.travelPlanner.Service.packingListService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class packingListControllerTest {

    @Mock
    private packingListService myPackingListService;

    @InjectMocks
    private packingListController packingListController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetList_Successful() {
        // Arrange
        String tripId = "trip123";
        PackingList mockPackingList = new PackingList();
        mockPackingList.setTripID(tripId);

        when(myPackingListService.getList(tripId)).thenReturn(mockPackingList);

        // Act
        ResponseEntity<ApiResponse<PackingList>> response = packingListController.saveList(tripId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().isSuccess());
        assertEquals(mockPackingList, response.getBody().getData());
        verify(myPackingListService).getList(tripId);
    }

    @Test
    void testGetList_NotFound() {
        // Arrange
        String tripId = "nonexistentTrip";
        when(myPackingListService.getList(tripId))
                .thenThrow(new IllegalArgumentException("Packing list not found for TripID: " + tripId));

        // Act
        ResponseEntity<ApiResponse<PackingList>> response = packingListController.saveList(tripId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertFalse(response.getBody().isSuccess());
        assertEquals("Packing list not found for TripID: " + tripId, response.getBody().getErrorMessage());
        verify(myPackingListService).getList(tripId);
    }
}
