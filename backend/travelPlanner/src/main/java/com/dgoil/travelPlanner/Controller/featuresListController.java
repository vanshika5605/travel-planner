package com.dgoil.travelPlanner.Controller;

import com.dgoil.travelPlanner.Model.DAO.FeaturesList;
import com.dgoil.travelPlanner.Service.featuresListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controller to handle API requests related to FeaturesList.
 * Provides an endpoint to fetch all available features.
 */
@RestController
@RequestMapping("/api/v1") // The base URL for API endpoints in version 1.
public class featuresListController {
    @Autowired
    private featuresListService myfeaturesListService;

    /**
     * Endpoint to retrieve all features from the database.
     * 
     * @return A list of FeaturesList objects containing the features.
     */
    @GetMapping("/getFeatures") // Handles GET request at '/api/v1/getFeatures'.
    public List<FeaturesList> getAllFeatures() {
        return myfeaturesListService.getAllFeatures();
    }
}
