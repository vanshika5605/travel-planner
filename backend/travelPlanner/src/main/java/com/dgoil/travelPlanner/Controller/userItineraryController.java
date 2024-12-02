package com.dgoil.travelPlanner.Controller;

import com.dgoil.travelPlanner.Model.DAO.UserItinerary;
import com.dgoil.travelPlanner.Model.DTO.ApiResponse;
import com.dgoil.travelPlanner.Service.userItineraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class userItineraryController {
    @Autowired
    private userItineraryService myUserItineraryService;

    @GetMapping("/getItinerary/{tripId}")
    public ResponseEntity<ApiResponse<Optional<UserItinerary>>> getUserItinerary(@PathVariable(required=false) String tripId) {
        try {
            System.out.println("Received tripId: " + tripId);
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

    @PostMapping("/addItinerary/")
    public ResponseEntity<ApiResponse<String>> saveUserItinerary(@RequestBody UserItinerary userItinerary){
        try {
            userItinerary.setTripID(tripIDGeneratorController.generateTripID());
            myUserItineraryService.saveUserItinerary(userItinerary);
            ApiResponse<String> response = new ApiResponse<String>(true, "Itinerary added!", null);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(IllegalArgumentException e) {
            ApiResponse<String> response = new ApiResponse<String>(false, "Exception thrown!", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }
}

