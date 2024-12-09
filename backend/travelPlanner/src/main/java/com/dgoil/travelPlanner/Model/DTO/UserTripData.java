package com.dgoil.travelPlanner.Model.DTO;

import com.dgoil.travelPlanner.Model.DAO.UserDetails;
import com.dgoil.travelPlanner.Model.DAO.UserItinerary;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
/**
 * Represents Trip data for a particular user.
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserTripData {
    private String email;
    private String tripId;
    private UserDetails userDetails;
    private UserItinerary userItinerary;
}
