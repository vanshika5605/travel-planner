package com.dgoil.travelPlanner.Controller;

import com.dgoil.travelPlanner.Model.DAO.UserDetails;
import com.dgoil.travelPlanner.Model.DTO.AdminStatistics;
import com.dgoil.travelPlanner.Model.DTO.ApiResponse;
import com.dgoil.travelPlanner.Model.DTO.LoginDetails;
import com.dgoil.travelPlanner.Service.userDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class userDetailsController {
    @Autowired
    private userDetailsService myUserDetailsService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserDetails>> login(@RequestBody LoginDetails loginDetails){
        try {
            UserDetails userDetails = myUserDetailsService.validateUser(loginDetails.getEmail(), loginDetails.getPassword());
            ApiResponse<UserDetails> response = new ApiResponse<UserDetails>(true, userDetails, null);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            ApiResponse<UserDetails> response = new ApiResponse<UserDetails>(false, null, e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/signUp")
    public ResponseEntity<ApiResponse<String>> addUser(@RequestBody UserDetails userDetails){
        try {
            myUserDetailsService.checkDuplicate(userDetails);
            ApiResponse<String> response = new ApiResponse<String>(true, "User Signed Up", null);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            ApiResponse<String> response = new ApiResponse<String>(false, null, e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/getUsers")
    public ResponseEntity<ApiResponse<List<UserDetails>>> getAllUsers() {
        try {
            List<UserDetails> list = myUserDetailsService.getAllUsers();
            ApiResponse<List<UserDetails>> response = new ApiResponse<List<UserDetails>>(true, list, null);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(IllegalArgumentException e) {
            ApiResponse<List<UserDetails>> response = new ApiResponse<List<UserDetails>>(false, null, e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/admin/statistics")
    public ResponseEntity<ApiResponse<AdminStatistics>> getAdminDetails() {
        AdminStatistics adminStatistics = myUserDetailsService.getAdminDetails();
        ApiResponse<AdminStatistics> response = new ApiResponse<AdminStatistics>(true, adminStatistics, null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/getUser/{emailId}")
    public ResponseEntity<ApiResponse<Optional<UserDetails>>> getUser(@PathVariable String emailId) {
        try {

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
            ApiResponse<Optional<UserDetails>> response = new ApiResponse<Optional<UserDetails>>(false, Optional.empty(), e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}
