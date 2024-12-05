package com.dgoil.travelPlanner.Service;

import com.dgoil.travelPlanner.Model.DAO.FeaturesList;
import com.dgoil.travelPlanner.Model.DAO.FeaturesList.Features;
import com.dgoil.travelPlanner.Repository.featuresListRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class featuresListServiceTest {

    @Mock
    private featuresListRepo featuresListRepo;

    @InjectMocks
    private featuresListService featuresListService;

    private List<FeaturesList> sampleFeaturesList;

    @BeforeEach
    void setUp() {
        // Prepare sample data for testing
        sampleFeaturesList = Arrays.asList(
                createFeaturesList(
                        Arrays.asList(
                                createFeature("Booking", "Manage travel bookings"),
                                createFeature("Itinerary", "Create and edit travel plans")
                        )
                ),
                createFeaturesList(
                        Arrays.asList(
                                createFeature("Budget Tracking", "Track travel expenses"),
                                createFeature("Recommendations", "Get personalized travel suggestions")
                        )
                )
        );
    }

    @Test
    @DisplayName("Get All Features - Successful Retrieval")
    void testGetAllFeatures_Success() {
        // Arrange
        when(featuresListRepo.findAll()).thenReturn(sampleFeaturesList);

        // Act
        List<FeaturesList> retrievedFeatures = featuresListService.getAllFeatures();

        // Assert
        assertNotNull(retrievedFeatures);
        assertEquals(2, retrievedFeatures.size());
        verify(featuresListRepo, times(1)).findAll();
    }

    @Test
    @DisplayName("Get All Features - Empty List")
    void testGetAllFeatures_EmptyList() {
        // Arrange
        when(featuresListRepo.findAll()).thenReturn(Collections.emptyList());

        // Act
        List<FeaturesList> retrievedFeatures = featuresListService.getAllFeatures();

        // Assert
        assertNotNull(retrievedFeatures);
        assertTrue(retrievedFeatures.isEmpty());
        verify(featuresListRepo, times(1)).findAll();
    }

    @Test
    @DisplayName("Get All Features - Verify Feature Details")
    void testGetAllFeatures_VerifyDetails() {
        // Arrange
        when(featuresListRepo.findAll()).thenReturn(sampleFeaturesList);

        // Act
        List<FeaturesList> retrievedFeatures = featuresListService.getAllFeatures();

        // Assert
        assertNotNull(retrievedFeatures.get(0).getFeatures());
        assertEquals("Booking", retrievedFeatures.get(0).getFeatures().get(0).getFeature());
        assertEquals("Manage travel bookings", retrievedFeatures.get(0).getFeatures().get(0).getDescription());
        assertEquals("Itinerary", retrievedFeatures.get(0).getFeatures().get(1).getFeature());
        assertEquals("Create and edit travel plans", retrievedFeatures.get(0).getFeatures().get(1).getDescription());
    }

    @Test
    @DisplayName("Get All Features - Repository Exception Handling")
    void testGetAllFeatures_RepositoryException() {
        // Arrange
        when(featuresListRepo.findAll()).thenThrow(new RuntimeException("Database connection error"));

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            featuresListService.getAllFeatures();
        });
        verify(featuresListRepo, times(1)).findAll();
    }

    // Utility method to create FeaturesList for testing
    private FeaturesList createFeaturesList(List<Features> features) {
        FeaturesList featuresList = new FeaturesList();
        featuresList.setFeatures(features);
        return featuresList;
    }

    // Utility method to create Features for testing
    private Features createFeature(String feature, String description) {
        Features featuresObj = new Features();
        featuresObj.setFeature(feature);
        featuresObj.setDescription(description);
        return featuresObj;
    }
}