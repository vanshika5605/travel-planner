package com.dgoil.travelPlanner.Controller;

import com.dgoil.travelPlanner.Model.UserItinerary;
import com.dgoil.travelPlanner.Service.userItineraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class userItineraryController {
    @Autowired
    private userItineraryService myUserItineraryService;

    @GetMapping("/getItinerary/{tripId}")
    public Optional<UserItinerary> getUserItinerary(@PathVariable String tripId) {
        return myUserItineraryService.getUserItinerary(tripId);
    }

    @PostMapping("/addItinerary/")
    public void saveUserItinerary(@RequestBody UserItinerary userItinerary){
        userItinerary.setTripID(tripIDGeneratorController.generateTripID());
        myUserItineraryService.saveUserItinerary(userItinerary);
    }
}

