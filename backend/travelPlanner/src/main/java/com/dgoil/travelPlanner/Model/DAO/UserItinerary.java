package com.dgoil.travelPlanner.Model.DAO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "userItinerary")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserItinerary {
    @Id
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

    public void setTripID(String tripID) {
        this.tripID = tripID;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Budget{
        private String activities;
        private String miscellaneous;
        private String accommodation;
        private String food;
        private String travel;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TripDetails{
        private String summary;
        private List<Itinerary> itinerary;

        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class Itinerary{
            private String date;
            private String day;
            private List<String> activities;
        }
    }
}
