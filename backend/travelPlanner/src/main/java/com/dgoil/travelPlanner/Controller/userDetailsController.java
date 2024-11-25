package com.dgoil.travelPlanner.Controller;

import com.dgoil.travelPlanner.Model.UserDetails;
import com.dgoil.travelPlanner.Model.UserItinerary;
import com.dgoil.travelPlanner.Service.userDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class userDetailsController {
    @Autowired
    private userDetailsService myUserDetailsService;

    @PostMapping("/addUser")
    public void addUser(@RequestBody UserDetails userDetails){
        myUserDetailsService.saveUser(userDetails);
    }

    @GetMapping("/getUsers")
    public List<UserDetails> getAllUsers() {
        return myUserDetailsService.getAllUsers();
    }

    @GetMapping("/getUser/{emailId}")
    public ResponseEntity<ApiResponse<Optional<UserDetails>>> getUser(@PathVariable(required=false) String emailId) {
        try {
            System.out.println("Received emailId: " + emailId);
            Optional<UserDetails> data = myUserDetailsService.getUser(emailId);

            // Return success response
            if (data.isEmpty()) {
                ApiResponse<Optional<UserDetails>> response = new ApiResponse<Optional<UserDetails>>(false, Optional.empty(), "No records found for the given emailId: " + emailId);
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            ApiResponse<Optional<UserDetails>> response = new ApiResponse<Optional<UserDetails>>(true, data, "Email Id Found!");
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (IllegalArgumentException e) {
            // Return error response
            System.out.println("Received emailId: " + emailId);
            ApiResponse<Optional<UserDetails>> response = new ApiResponse<Optional<UserDetails>>(false, Optional.empty(), e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}
