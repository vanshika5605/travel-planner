package com.dgoil.travelPlanner.Controller;

import com.dgoil.travelPlanner.Model.UserDetails;
import com.dgoil.travelPlanner.Service.userDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public UserDetails getUser(@PathVariable String emailId) {
        return myUserDetailsService.getUser(emailId);
    }
}
