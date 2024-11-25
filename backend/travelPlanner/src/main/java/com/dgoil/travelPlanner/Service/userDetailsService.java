package com.dgoil.travelPlanner.Service;

import com.dgoil.travelPlanner.Model.UserDetails;
import com.dgoil.travelPlanner.Repository.userDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<UserDetails> getUser(String emailId){
        if (emailId == null || emailId.isEmpty()) {
            throw new IllegalArgumentException("tripId parameter is missing or empty.");
        }
        return myUserDetailsRepo.findByEmail(emailId);
    }
}
