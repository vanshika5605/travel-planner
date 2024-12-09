package com.dgoil.travelPlanner.Service;

import com.dgoil.travelPlanner.Model.DAO.FeaturesList;
import com.dgoil.travelPlanner.Repository.featuresListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for handling business logic related to `FeaturesList`.
 * This class interacts with the `featuresListRepo` to retrieve feature data.
 */
@Service
public class featuresListService {
    @Autowired
    featuresListRepo myfeaturesListRepo;

    /**
     * Retrieves all features from the `FeaturesList` collection.
     * 
     * @return A list of `FeaturesList` documents.
     */
    public List<FeaturesList> getAllFeatures() {
        return myfeaturesListRepo.findAll();
    }
}
