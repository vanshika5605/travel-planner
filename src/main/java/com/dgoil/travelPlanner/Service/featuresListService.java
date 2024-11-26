package com.dgoil.travelPlanner.Service;

import com.dgoil.travelPlanner.Model.FeaturesList;
import com.dgoil.travelPlanner.Model.UserDetails;
import com.dgoil.travelPlanner.Respository.featuresListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class featuresListService {
    @Autowired
    featuresListRepo myfeaturesListRepo;

    public List<FeaturesList> getAllFeatures() {
        return myfeaturesListRepo.findAll();
    }
}
