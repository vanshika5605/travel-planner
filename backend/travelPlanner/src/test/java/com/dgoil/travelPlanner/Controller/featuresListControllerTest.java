package com.dgoil.travelPlanner.Controller;

import com.dgoil.travelPlanner.Model.DAO.FeaturesList;
import com.dgoil.travelPlanner.Model.DAO.FeaturesList.Features;
import com.dgoil.travelPlanner.Service.featuresListService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

@ExtendWith(MockitoExtension.class)
public class featuresListControllerTest {

    private MockMvc mockMvc;

    @Mock
    private featuresListService myfeaturesListService;

    @InjectMocks
    private featuresListController featuresListController;

    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(featuresListController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    public void testGetAllFeaturesSuccess() throws Exception {
        // Prepare test data
        Features feature1 = new Features("Accommodation", "Find best places to stay");
        Features feature2 = new Features("Transportation", "Manage travel routes");

        FeaturesList featuresList1 = new FeaturesList();
        featuresList1._id = "1";
        featuresList1.features = Arrays.asList(feature1);

        FeaturesList featuresList2 = new FeaturesList();
        featuresList2._id = "2";
        featuresList2.features = Arrays.asList(feature2);

        List<FeaturesList> featuresLists = Arrays.asList(featuresList1, featuresList2);

        // Mock service method
        when(myfeaturesListService.getAllFeatures()).thenReturn(featuresLists);

        // Perform the request and validate
        mockMvc.perform(get("/api/v1/getFeatures"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0]._id").value("1"))
                .andExpect(jsonPath("$[0].features[0].feature").value("Accommodation"))
                .andExpect(jsonPath("$[0].features[0].description").value("Find best places to stay"))
                .andExpect(jsonPath("$[1]._id").value("2"))
                .andExpect(jsonPath("$[1].features[0].feature").value("Transportation"))
                .andExpect(jsonPath("$[1].features[0].description").value("Manage travel routes"));

        // Verify service method was called
        verify(myfeaturesListService, times(1)).getAllFeatures();
    }

    @Test
    public void testGetAllFeaturesEmptyList() throws Exception {
        // Mock service method to return an empty list
        when(myfeaturesListService.getAllFeatures()).thenReturn(Arrays.asList());

        // Perform the request and validate
        mockMvc.perform(get("/api/v1/getFeatures"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));

        // Verify service method was called
        verify(myfeaturesListService, times(1)).getAllFeatures();
    }

    @Test
    public void testGetAllFeaturesWithEmptyFeatures() throws Exception {
        // Prepare test data with empty features
        FeaturesList featuresList = new FeaturesList();
        featuresList._id = "1";
        featuresList.features = Arrays.asList();

        // Mock service method
        when(myfeaturesListService.getAllFeatures()).thenReturn(Arrays.asList(featuresList));

        // Perform the request and validate
        mockMvc.perform(get("/api/v1/getFeatures"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0]._id").value("1"))
                .andExpect(jsonPath("$[0].features", hasSize(0)));

        // Verify service method was called
        verify(myfeaturesListService, times(1)).getAllFeatures();
    }

//    @Test
//    public void testGetAllFeaturesServiceException() throws Exception {
//        // Mock service method to throw an exception
//        when(myfeaturesListService.getAllFeatures())
//                .thenThrow(new RuntimeException("Service error"));
//
//        // Perform the request and validate
//        mockMvc.perform(get("/api/v1/getFeatures"))
//                .andExpect(status().is5xxServerError());
//
//        // Verify service method was called
//        verify(myfeaturesListService, times(1)).getAllFeatures();
//    }
}