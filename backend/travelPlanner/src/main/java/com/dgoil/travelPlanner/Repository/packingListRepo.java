package com.dgoil.travelPlanner.Repository;

import com.dgoil.travelPlanner.Model.DAO.PackingList;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface packingListRepo extends MongoRepository<PackingList,String> {
    @Query("{'tripID':?0}")
    public Optional<PackingList> getByTripId(String tripId);
}
