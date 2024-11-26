package com.dgoil.travelPlanner.Service;

import com.dgoil.travelPlanner.Model.UserItinerary;
import com.dgoil.travelPlanner.Respository.userItineraryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class userItineraryService {
    @Autowired
    userItineraryRepo myUserItineraryRepo;

    public Optional<UserItinerary> getUserItinerary(String tripId){
        return myUserItineraryRepo.findByTripID(tripId);
    }

    public void saveUserItinerary(UserItinerary userItinerary){
        myUserItineraryRepo.save(userItinerary);
    }
}
