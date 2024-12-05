package com.dgoil.travelPlanner.Controller;

import com.dgoil.travelPlanner.Model.DAO.PackingList;
import com.dgoil.travelPlanner.Model.DAO.PackingList.PackingObj;
import com.dgoil.travelPlanner.Model.DAO.PackingList.PackingObj.Item;
import com.dgoil.travelPlanner.Service.packingListService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Collections;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class packingListControllerTest {

    private MockMvc mockMvc;

    @Mock
    private packingListService packingListService;

    @InjectMocks
    private packingListController packingListController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(packingListController).build();
        objectMapper = new ObjectMapper();
    }

    @Nested
    @DisplayName("Save Packing List Tests")
    class SavePackingListTests {

        @Test
        @DisplayName("Successfully save a packing list")
        void testSaveListSuccess() throws Exception {
            // Arrange
            PackingList packingList = createSamplePackingList("trip123");

            // Mock service method
            doNothing().when(packingListService).saveList(packingList);

            // Act & Assert
            mockMvc.perform(post("/api/v1/saveList")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(packingList)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.message").value("Packing List saved!"));

            // Verify service method was called
            verify(packingListService, times(1)).saveList(packingList);
        }

        @Test
        @DisplayName("Fail to save packing list due to invalid input")
        void testSaveListFailure() throws Exception {
            // Arrange
            PackingList packingList = createSamplePackingList("trip123");

            // Mock service method to throw an exception
            doThrow(new IllegalArgumentException("Invalid packing list"))
                    .when(packingListService).saveList(packingList);

            // Act & Assert
            mockMvc.perform(post("/api/v1/saveList")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(packingList)))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.success").value(false))
                    .andExpect(jsonPath("$.message").value("Invalid packing list"));

            // Verify service method was called
            verify(packingListService, times(1)).saveList(packingList);
        }

        @Test
        @DisplayName("Fail to save packing list with empty trip ID")
        void testSaveListWithEmptyTripId() throws Exception {
            // Arrange
            PackingList packingList = createSamplePackingList("");

            // Act & Assert
            mockMvc.perform(post("/api/v1/saveList")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(packingList)))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.success").value(false))
                    .andExpect(jsonPath("$.message").value("Trip ID cannot be empty"));
        }
    }

    @Nested
    @DisplayName("Get Packing List Tests")
    class GetPackingListTests {

        @Test
        @DisplayName("Successfully retrieve a packing list")
        void testGetListSuccess() throws Exception {
            // Arrange
            String tripId = "trip123";
            PackingList packingList = createSamplePackingList(tripId);

            // Mock service method
            when(packingListService.getList(tripId)).thenReturn(packingList);

            // Act & Assert
            mockMvc.perform(get("/api/v1/getList/{tripId}", tripId))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.data.tripID").value(tripId));

            // Verify service method was called
            verify(packingListService, times(1)).getList(tripId);
        }

        @Test
        @DisplayName("Fail to retrieve packing list for non-existent trip")
        void testGetListFailure() throws Exception {
            // Arrange
            String tripId = "trip123";

            // Mock service method to throw an exception
            when(packingListService.getList(tripId))
                    .thenThrow(new IllegalArgumentException("Trip not found"));

            // Act & Assert
            mockMvc.perform(get("/api/v1/getList/{tripId}", tripId))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.success").value(false))
                    .andExpect(jsonPath("$.message").value("Trip not found"));

            // Verify service method was called
            verify(packingListService, times(1)).getList(tripId);
        }

        @Test
        @DisplayName("Fail to retrieve packing list with null trip ID")
        void testGetListWithNullTripId() throws Exception {
            // Act & Assert
            mockMvc.perform(get("/api/v1/getList/{tripId}", (String)null))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.success").value(false))
                    .andExpect(jsonPath("$.message").value("Trip ID is required"));
        }
    }

    // Utility method to create a sample packing list for testing
    private PackingList createSamplePackingList(String tripId) {
        PackingList packingList = new PackingList();
        packingList.setTripID(tripId);

        PackingObj packingObj = new PackingObj();
        packingObj.setEssentialDocuments(Arrays.asList(
                new Item("Passport", 1, false),
                new Item("Visa", 1, false)
        ));
        packingObj.setClothing(Arrays.asList(
                new Item("T-Shirt", 3, false),
                new Item("Jeans", 2, false)
        ));
        packingObj.setToiletries(Collections.singletonList(
                new Item("Toothbrush", 1, false)
        ));
        packingObj.setElectronics(Arrays.asList(
                new Item("Phone Charger", 1, false),
                new Item("Laptop", 1, false)
        ));
        packingObj.setMiscellaneous(Collections.singletonList(
                new Item("Travel Adapter", 1, false)
        ));

        packingList.setPackingList(packingObj);
        return packingList;
    }
}