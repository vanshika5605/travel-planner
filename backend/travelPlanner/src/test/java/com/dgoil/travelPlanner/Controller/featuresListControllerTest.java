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
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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

        FeaturesList featuresList1 = new FeaturesList("1", Arrays.asList(feature1));
        FeaturesList featuresList2 = new FeaturesList("2", Arrays.asList(feature2));

        List<FeaturesList> featuresLists = Arrays.asList(featuresList1, featuresList2);

        // Mock service method
        when(myfeaturesListService.getAllFeatures()).thenReturn(featuresLists);

        // Perform the request and validate
        mockMvc.perform(get("/api/v1/getFeatures").contentType(MediaType.APPLICATION_JSON))
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
        mockMvc.perform(get("/api/v1/getFeatures").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));

        // Verify service method was called
        verify(myfeaturesListService, times(1)).getAllFeatures();
    }

    @Test
    public void testGetAllFeaturesWithEmptyFeatures() throws Exception {
        // Prepare test data with empty features
        FeaturesList featuresList = new FeaturesList("1", Arrays.asList());

        // Mock service method
        when(myfeaturesListService.getAllFeatures()).thenReturn(Arrays.asList(featuresList));

        // Perform the request and validate
        mockMvc.perform(get("/api/v1/getFeatures").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0]._id").value("1"))
                .andExpect(jsonPath("$[0].features", hasSize(0)));

        // Verify service method was called
        verify(myfeaturesListService, times(1)).getAllFeatures();
    }
}
