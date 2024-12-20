package com.dgoil.travelPlanner.Model.DTO;

import com.dgoil.travelPlanner.Model.DAO.UserItinerary;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
/**
 * Represents detailed trip information for a specific user.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserTripsDetails {
    private String email;
    private List<TripDetails> pastTrips;
    private List<TripDetails> upcomingTrips;
    private List<TripDetails> onGoingTrips;
    private List<UserItinerary.TripDetails.Itinerary.Activities> todayActivities;
    /**
     * Represents detailed information about a specific trip.
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TripDetails {
        private String tripId;
        private String destination;
        private String startDate;
        private String endDate;
        private UserItinerary.Budget budget;
        private String groupType;
        private Boolean isPackingListCreated;
    }
}
