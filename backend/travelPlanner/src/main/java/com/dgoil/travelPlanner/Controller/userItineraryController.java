package com.dgoil.travelPlanner.Controller;

import com.dgoil.travelPlanner.Model.DAO.UserItinerary;
import com.dgoil.travelPlanner.Model.DTO.ApiResponse;
import com.dgoil.travelPlanner.Model.DTO.UserTripData;
import com.dgoil.travelPlanner.Model.DTO.UserTripsDetails;
import com.dgoil.travelPlanner.Service.userItineraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class userItineraryController {
    @Autowired
    private userItineraryService myUserItineraryService;

    /**
     * Endpoint to fetch a user's itinerary for a specific trip.
     * 
     * @param tripId The unique identifier of the trip.
     * @return Response containing the itinerary for the specified trip ID.
     */
    @GetMapping("/getItinerary/{tripId}")
    public ResponseEntity<ApiResponse<Optional<UserItinerary>>> getUserItinerary(@PathVariable(required=false) String tripId) {
        try {
            Optional<UserItinerary> data = myUserItineraryService.getUserItinerary(tripId);

            // Return success response
            if (data.isEmpty()) {
                ApiResponse<Optional<UserItinerary>> response = new ApiResponse<Optional<UserItinerary>>(false, Optional.empty(), "No itinerary found for tripID: " + tripId);
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            ApiResponse<Optional<UserItinerary>> response = new ApiResponse<Optional<UserItinerary>>(true, data, "Trip Id Found!");
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (IllegalArgumentException e) {
            // Return error response
            System.out.println("Received tripId: " + tripId);
            ApiResponse<Optional<UserItinerary>> response = new ApiResponse<Optional<UserItinerary>>(false, Optional.empty(), e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Endpoint to retrieve detailed trip and user data for a specific trip.
     * 
     * @param tripId The unique identifier of the trip.
     * @return Response containing detailed trip and user data.
     */
    @GetMapping("/tripAndUserDetails/{tripId}")
    public ResponseEntity<ApiResponse<UserTripData>> getUserTripData(@PathVariable String tripId) {
        UserTripData userTripData = myUserItineraryService.getUserTripData(tripId);
        ApiResponse<UserTripData> response = new ApiResponse<UserTripData>(false, userTripData, null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Endpoint to add a new itinerary for a user.
     * 
     * @param userItinerary The itinerary to be added.
     * @return Response indicating whether the itinerary was successfully added.
     */
    @PostMapping("/addItinerary")
    public ResponseEntity<ApiResponse<String>> saveUserItinerary(@RequestBody UserItinerary userItinerary){
        try {
            myUserItineraryService.saveUserItinerary(userItinerary);
            ApiResponse<String> response = new ApiResponse<String>(true, "Itinerary added!", null);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(IllegalArgumentException e) {
            ApiResponse<String> response = new ApiResponse<String>(false, "Exception thrown!", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }

    /**
     * Endpoint to retrieve trip details for a user by their email address.
     * 
     * @param email The email address of the user.
     * @return Response containing trip details for the user.
     */
    @GetMapping("/user/tripDetails/{email}")
    public ResponseEntity<ApiResponse<UserTripsDetails>> userTripDetails(@PathVariable String email) {
        try {
            UserTripsDetails userTripsDetails = myUserItineraryService.getUserTripDetails(email);
            ApiResponse<UserTripsDetails> response = new ApiResponse<>(true, userTripsDetails, null);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(IllegalArgumentException e) {
            ApiResponse<UserTripsDetails> response = new ApiResponse<UserTripsDetails>(false, null, e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}

