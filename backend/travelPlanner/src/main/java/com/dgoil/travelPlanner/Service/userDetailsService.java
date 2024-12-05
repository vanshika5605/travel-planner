package com.dgoil.travelPlanner.Service;

import com.dgoil.travelPlanner.Model.DAO.UserDetails;
import com.dgoil.travelPlanner.Model.DTO.AdminStatistics;
import com.dgoil.travelPlanner.Repository.userDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class userDetailsService {
    @Autowired
    userDetailsRepo myUserDetailsRepo;
    @Autowired
    userItineraryService userItineraryService;
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
        adminStatistics.setTotalUsers((int) myUserDetailsRepo.count());
        LocalDateTime date = LocalDateTime.now().minusDays(30);
        adminStatistics.setNewUsers(myUserDetailsRepo.getRecentUsers(date).size());
        adminStatistics.setPastTrips(userItineraryService.pastTrips());
        adminStatistics.setUpcomingTrips(userItineraryService.upcomingTrips());
        adminStatistics.setPopularDestinations(userItineraryService.getPopularDestination());

        return adminStatistics;
    }
}
