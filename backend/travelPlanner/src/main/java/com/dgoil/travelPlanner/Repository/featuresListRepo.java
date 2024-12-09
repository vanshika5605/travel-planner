package com.dgoil.travelPlanner.Repository;

import com.dgoil.travelPlanner.Model.DAO.FeaturesList;
import org.springframework.data.mongodb.repository.MongoRepository;
/**
 * Repository interface for managing `FeaturesList` documents in the MongoDB database.
 * Extends the `MongoRepository` to provide CRUD operations and custom query support.
 */
public interface featuresListRepo extends MongoRepository<FeaturesList,String> {
}
