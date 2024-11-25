package com.dgoil.travelPlanner.Repository;

import com.dgoil.travelPlanner.Model.UserItinerary;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface userItineraryRepo extends MongoRepository<UserItinerary,String>{
    Optional<UserItinerary> findByTripID(String tripID);
}
