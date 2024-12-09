package com.dgoil.travelPlanner.Repository;

import com.dgoil.travelPlanner.Model.DAO.PackingList;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;
/**
 * Repository interface for managing `PackingList` documents in the MongoDB database.
 * Provides custom query for retrieving packing lists by trip ID.
 */
public interface packingListRepo extends MongoRepository<PackingList,String> {
     /**
     * Custom query to fetch a PackingList by its associated trip ID.
     * 
     * @param tripId The trip ID associated with the packing list.
     * @return An Optional containing the PackingList if found, or empty if not.
     */
    @Query("{'tripID':?0}")
    public Optional<PackingList> getByTripId(String tripId);
}
