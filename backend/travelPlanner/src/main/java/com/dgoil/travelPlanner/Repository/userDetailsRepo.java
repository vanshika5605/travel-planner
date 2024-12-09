package com.dgoil.travelPlanner.Repository;

import com.dgoil.travelPlanner.Model.DAO.UserDetails;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
/**
 * Repository interface for managing `UserDetails` documents in the MongoDB database.
 * Provides methods for querying and retrieving user details by email and by update time.
 */
public interface userDetailsRepo extends MongoRepository<UserDetails,String> {
    /**
     * Retrieves a `UserDetails` document by the user's email address.
     * 
     * @param emailId The email address of the user.
     * @return An Optional containing the `UserDetails` if found, or empty if not.
     */
    Optional<UserDetails> findByEmail(String emailId);
    
    /**
     * Retrieves a list of users who have updated their details after a specified date.
     * 
     * @param date The date to compare the `updatedAt` field against.
     * @return A list of `UserDetails` updated after the given date.
     */
    @Query("{'updatedAt':{'$gte':?0}}")
    List<UserDetails> getRecentUsers(LocalDateTime date);

}
