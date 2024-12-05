package com.dgoil.travelPlanner.Model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatistics {
    private Integer totalUsers;
    private Integer newUsers;
    private Integer upcomingTrips;
    private Integer pastTrips;
    private List<PopularDestinations> popularDestinations;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PopularDestinations {
        private Integer count;
        private String destination;
    }
}
