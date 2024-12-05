package com.dgoil.travelPlanner.Service;

import com.dgoil.travelPlanner.Model.DAO.UserDetails;
import com.dgoil.travelPlanner.Model.DTO.AdminStatistics;
import com.dgoil.travelPlanner.Repository.userDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class userDetailsService {
    @Autowired
    userDetailsRepo myUserDetailsRepo;

    public UserDetails validateUser(String email, String password){
        return myUserDetailsRepo.findByEmail(email)
                .filter(user -> user.getPassword().equals(password)) // Validate password
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));
    }

    public void checkDuplicate(UserDetails userDetails){
        if (myUserDetailsRepo.findByEmail(userDetails.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already registered.");
        }
        userDetails.setUpdatedAt(LocalDateTime.now());
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

    public AdminStatistics getAdminDetails() {
        AdminStatistics adminStatistics = new AdminStatistics();
        adminStatistics.setTotalUsers(50);
        adminStatistics.setNewUsers(10);
        adminStatistics.setPastTrips(180);
        adminStatistics.setUpcomingTrips(20);

        List<AdminStatistics.PopularDestinations> popularDestinations = new ArrayList<>();
        AdminStatistics.PopularDestinations popularDestinations1 = new AdminStatistics.PopularDestinations(100, "Paris");
        AdminStatistics.PopularDestinations popularDestinations2 = new AdminStatistics.PopularDestinations(75, "New York");
        AdminStatistics.PopularDestinations popularDestinations3 = new AdminStatistics.PopularDestinations(42, "Kanpur");
        popularDestinations.add(popularDestinations1);
        popularDestinations.add(popularDestinations2);
        popularDestinations.add(popularDestinations3);
        adminStatistics.setPopularDestinations(popularDestinations);

        return adminStatistics;
    }
}
