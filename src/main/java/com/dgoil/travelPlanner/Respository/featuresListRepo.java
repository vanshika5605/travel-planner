package com.dgoil.travelPlanner.Respository;

import com.dgoil.travelPlanner.Model.FeaturesList;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface featuresListRepo extends MongoRepository<FeaturesList,String> {
}
