package com.dgoil.travelPlanner.Repository;

import com.dgoil.travelPlanner.Model.DAO.UserItinerary;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface userItineraryRepo extends MongoRepository<UserItinerary,String>{
    Optional<UserItinerary> findByTripID(String tripID);

    @Query("{'email':?0}")
    public List<UserItinerary> getUserTrips(String email);
}
