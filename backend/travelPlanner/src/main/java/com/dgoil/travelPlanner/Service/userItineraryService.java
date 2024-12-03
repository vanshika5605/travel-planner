package com.dgoil.travelPlanner.Service;

import com.dgoil.travelPlanner.Model.DAO.UserItinerary;
import com.dgoil.travelPlanner.Repository.userItineraryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class userItineraryService {
    @Autowired
    userItineraryRepo myUserItineraryRepo;

    public Optional<UserItinerary> getUserItinerary(String tripId) {
        if (tripId == null || tripId.isEmpty()) {
            throw new IllegalArgumentException("tripId parameter is missing or empty.");
        }
        return myUserItineraryRepo.findByTripID(tripId);
    }

    public void saveUserItinerary(UserItinerary userItinerary){
        myUserItineraryRepo.save(userItinerary);
    }
}
