package com.dgoil.travelPlanner.Repository;

import com.dgoil.travelPlanner.Model.DAO.FeaturesList;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface featuresListRepo extends MongoRepository<FeaturesList,String> {
}
