package com.dgoil.travelPlanner.Service;

import com.dgoil.travelPlanner.Model.DAO.FeaturesList;
import com.dgoil.travelPlanner.Repository.featuresListRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class featuresListServiceTest {

    @Mock
    private featuresListRepo featuresListRepo;

    @InjectMocks
    private featuresListService featuresListService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllFeatures() {
        // Prepare test data
        FeaturesList.Features feature1 = new FeaturesList.Features("Accommodation", "Find best places to stay");
        FeaturesList.Features feature2 = new FeaturesList.Features("Transportation", "Manage travel routes");

        FeaturesList featuresList1 = new FeaturesList("1", Arrays.asList(feature1));
        FeaturesList featuresList2 = new FeaturesList("2", Arrays.asList(feature2));

        List<FeaturesList> featuresLists = Arrays.asList(featuresList1, featuresList2);

        // Mock repository method
        when(featuresListRepo.findAll()).thenReturn(featuresLists);

        // Call service method
        List<FeaturesList> result = featuresListService.getAllFeatures();

        // Assert results
        assertEquals(2, result.size());
        assertEquals("1", result.get(0).get_id());
        assertEquals("Accommodation", result.get(0).getFeatures().get(0).getFeature());
        assertEquals("Find best places to stay", result.get(0).getFeatures().get(0).getDescription());

        // Verify repository method was called
        verify(featuresListRepo, times(1)).findAll();
    }

    @Test
    public void testGetAllFeaturesEmpty() {
        // Mock repository method to return an empty list
        when(featuresListRepo.findAll()).thenReturn(Arrays.asList());

        // Call service method
        List<FeaturesList> result = featuresListService.getAllFeatures();

        // Assert results
        assertEquals(0, result.size());

        // Verify repository method was called
        verify(featuresListRepo, times(1)).findAll();
    }
}
