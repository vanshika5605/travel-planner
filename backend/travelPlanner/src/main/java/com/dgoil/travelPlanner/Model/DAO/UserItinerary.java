package com.dgoil.travelPlanner.Model.DAO;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * Represents a user's travel itinerary stored in the "userItinerary" MongoDB collection.
 */
@Document(collection = "userItinerary")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserItinerary {
    @Id // Unique identifier for the itinerary document.
    private String _id;
    private String email;
    private String tripID;
    private String destination;
    private String mood;
    private String groupType;
    private String startDate;
    private String endDate;
    private Budget budget;
    private String customText;
    private TripDetails tripDetails;
    private Boolean isPackingListCreated;

    public void setTripID(String tripID) {
        this.tripID = tripID;
    }
    /**
     * Represents the budget details for a trip.
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Budget{
        private Integer activities;
        private Integer miscellaneous;
        private Integer accommodation;
        private Integer food;
        private Integer travel;
    }
    /**
     * Represents the trip details, including a summary and daily itinerary.
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TripDetails{
        private String summary;
        private List<Itinerary> itinerary;
        /**
         * Represents a single day's itinerary.
         */
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class Itinerary{
            private String date;
            private String day;
            private String weekDay;
            private String notes;
            private List<Activities> activities;
            /**
             * Represents an activity for a specific day.
             */
            @Data
            @NoArgsConstructor
            @AllArgsConstructor
            public static class Activities{
                private String category;
                private String activity;
            }
        }
    }
}
