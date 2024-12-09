package com.dgoil.travelPlanner.Service;

import com.dgoil.travelPlanner.Model.DAO.PackingList;
import com.dgoil.travelPlanner.Model.DAO.UserItinerary;
import com.dgoil.travelPlanner.Repository.packingListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service class for handling business logic related to the packing list.
 * This service interacts with the `packingListRepo` and `userItineraryService` to manage packing list data.
 */
@Service
public class packingListService {
    @Autowired
    packingListRepo mypackingListRepo;
    @Autowired
    userItineraryService myUserItineraryService;

    /**
     * Saves or updates the packing list for a given trip.
     * If a packing list already exists for the trip, it updates the existing one. 
     * Otherwise, it inserts a new packing list.
     * 
     * Additionally, it marks the packing list as created in the associated user's itinerary.
     * 
     * @param packingList The packing list to be saved or updated.
     */
    public void saveList(PackingList packingList){

        String tripId = packingList.getTripID();
        PackingList existingPackingList = mypackingListRepo.getByTripId(tripId).orElse(null);
        // Insert or update the packing list in the repository.
        if(existingPackingList == null) {
            mypackingListRepo.insert(packingList);
        } else {
            packingList.set_id(existingPackingList.get_id());
            mypackingListRepo.save(packingList);
        }
        // Update the user itinerary to reflect packing list creation.
        Optional<UserItinerary> userItinerary = myUserItineraryService.getUserItinerary(tripId);
        if(userItinerary.isPresent()) {
            UserItinerary userItineraryData = userItinerary.get();
            userItineraryData.setIsPackingListCreated(Boolean.TRUE);
            myUserItineraryService.saveItinerary(userItineraryData);
        }
    }
    /**
     * Retrieves the packing list for a given trip.
     * 
     * @param tripId The unique ID of the trip.
     * @return The packing list associated with the trip.
     * @throws IllegalArgumentException if no packing list is found for the trip ID.
     */
     public PackingList getList(String tripId) {
         return mypackingListRepo.getByTripId(tripId)
                 .orElseThrow(() -> new IllegalArgumentException("Packing list not found for TripID: " + tripId));
     }
}

