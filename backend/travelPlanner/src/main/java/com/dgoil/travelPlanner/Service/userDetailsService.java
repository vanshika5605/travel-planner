package com.dgoil.travelPlanner.Service;

import com.dgoil.travelPlanner.Model.DAO.UserDetails;
import com.dgoil.travelPlanner.Model.DTO.AdminStatistics;
import com.dgoil.travelPlanner.Repository.userDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Service class for handling business logic related to user details.
 * This class manages user authentication, registration, and statistics.
 */
@Service
public class userDetailsService {
    @Autowired
    userDetailsRepo myUserDetailsRepo;
    @Autowired
    userItineraryService userItineraryService;

    /**
     * Validates user credentials by checking if the email exists and the password matches.
     * 
     * @param email The user's email.
     * @param password The user's password.
     * @return The `UserDetails` object if credentials are valid.
     * @throws IllegalArgumentException if the email or password is invalid.
     */
    public UserDetails validateUser(String email, String password){
        return myUserDetailsRepo.findByEmail(email)
                .filter(user -> user.getPassword().equals(password)) // Validate password
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));
    }

    /**
     * Checks if the user email is already registered. If not, the user is saved.
     * 
     * @param userDetails The `UserDetails` object to check and save.
     * @throws IllegalArgumentException if the email is already registered.
     */
    public void checkDuplicate(UserDetails userDetails){
        if (myUserDetailsRepo.findByEmail(userDetails.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already registered.");
        }
        userDetails.setUpdatedAt(LocalDateTime.now());
        myUserDetailsRepo.save(userDetails);
    }

    /**
     * Retrieves all users from the repository.
     * 
     * @return A list of all `UserDetails` objects.
     */
    public List<UserDetails> getAllUsers() {
        return myUserDetailsRepo.findAll();
    }

    /**
     * Retrieves a user by their email.
     * 
     * @param emailId The email of the user.
     * @return An `Optional` containing the `UserDetails` object if found.
     * @throws IllegalArgumentException if the emailId is null or empty.
     */
    public Optional<UserDetails> getUser(String emailId){
        if (emailId == null || emailId.isEmpty()) {
            throw new IllegalArgumentException("tripId parameter is missing or empty.");
        }
        return myUserDetailsRepo.findByEmail(emailId);
    }

    /**
     * Retrieves statistics for the admin, including total users, new users in the last 30 days, 
     * past trips, upcoming trips, and popular destinations.
     * 
     * @return An `AdminStatistics` object containing the computed statistics.
     */
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
