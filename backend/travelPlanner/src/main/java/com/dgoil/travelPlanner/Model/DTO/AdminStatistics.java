package com.dgoil.travelPlanner.Model.DTO;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * Represents statistical data for administrative purposes.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatistics {
    private Integer totalUsers;
    private Integer newUsers;
    private Integer upcomingTrips;
    private Integer pastTrips;
    private List<PopularDestinations> popularDestinations;
    /**
     * Represents a popular destination with its name and occurrence count.
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PopularDestinations {
        private Integer count;
        private String destination;
    }
}
