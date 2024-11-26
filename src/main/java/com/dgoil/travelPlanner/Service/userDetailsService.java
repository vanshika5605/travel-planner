package com.dgoil.travelPlanner.Service;

import com.dgoil.travelPlanner.Model.UserDetails;
import com.dgoil.travelPlanner.Respository.userDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class userDetailsService {
    @Autowired
    userDetailsRepo myUserDetailsRepo;

    public void saveUser(UserDetails userDetails) {
        myUserDetailsRepo.save(userDetails);
    }

    public List<UserDetails> getAllUsers() {
        return myUserDetailsRepo.findAll();
    }

    public UserDetails getUser(String emailId){
        return myUserDetailsRepo.findById(emailId).orElse(null);
    }
}
