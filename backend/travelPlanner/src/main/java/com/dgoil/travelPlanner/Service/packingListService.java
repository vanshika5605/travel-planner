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

        String tripId = packingList.getTripID();
        PackingList existingPackingList = mypackingListRepo.getByTripId(tripId).orElse(null);
        if(existingPackingList == null) {
            mypackingListRepo.insert(packingList);
        } else {
            packingList.set_id(existingPackingList.get_id());
            mypackingListRepo.save(packingList);
        }
        Optional<UserItinerary> userItinerary = userItineraryService.getUserItinerary(tripId);
        if(userItinerary.isPresent()) {
            UserItinerary userItineraryData = userItinerary.get();
            userItineraryData.setIsPackingListCreated(Boolean.TRUE);
            userItineraryService.saveUserItinerary(userItineraryData);
        }
    }

     public PackingList getList(String tripId) {
         return mypackingListRepo.getByTripId(tripId)
                 .orElseThrow(() -> new IllegalArgumentException("Packing list not found for TripID: " + tripId));
     }
}

