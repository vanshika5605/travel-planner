package com.dgoil.travelPlanner.Service;

import com.dgoil.travelPlanner.Model.DAO.PackingList;
import com.dgoil.travelPlanner.Model.DAO.UserItinerary;
import com.dgoil.travelPlanner.Repository.packingListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class packingListService {
    @Autowired
    packingListRepo mypackingListRepo;
    @Autowired
    userItineraryService userItineraryService;

    public void saveList(PackingList packingList){

        Optional<UserItinerary> userItinerary = userItineraryService.getUserItinerary(packingList.getTripID());
        if(userItinerary.isPresent()) {
            UserItinerary userItineraryData = userItinerary.get();
            userItineraryData.setIsPackingListCreated(Boolean.TRUE);
            userItineraryService.saveUserItinerary(userItineraryData);
        }
        mypackingListRepo.save(packingList);
    }

     public PackingList getList(String tripId) {
         return mypackingListRepo.getByTripId(tripId)
                 .orElseThrow(() -> new IllegalArgumentException("Packing list not found for TripID: " + tripId));
     }
}

