package com.dgoil.travelPlanner.Repository;

import com.dgoil.travelPlanner.Model.DAO.UserItinerary;
import com.dgoil.travelPlanner.Model.DTO.AdminStatistics;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
/**
 * Repository interface for managing `UserItinerary` documents in the MongoDB database.
 * Provides methods for querying user itineraries, including by trip ID, email, and trip dates.
 */
public interface userItineraryRepo extends MongoRepository<UserItinerary,String>{
    /**
     * Finds a `UserItinerary` document by its trip ID.
     * 
     * @param tripID The unique ID of the trip.
     * @return An Optional containing the `UserItinerary` if found, or empty if not.
     */
    Optional<UserItinerary> findByTripID(String tripID);

    /**
     * Retrieves a list of `UserItinerary` documents for a specific user based on their email.
     * 
     * @param email The email address of the user.
     * @return A list of `UserItinerary` documents.
     */
    @Query("{'email':?0}")
    public List<UserItinerary> getUserTrips(String email);

    /**
     * Retrieves a list of `UserItinerary` documents where the trip has already ended.
     * 
     * @param date The date to compare the `endDate` field against.
     * @return A list of `UserItinerary` documents for past trips.
     */
    @Query("{'endDate':{'$lt':?0}}")
    public List<UserItinerary> getPastTrips(String date);

    /**
     * Retrieves a list of `UserItinerary` documents for trips that have not yet started.
     * 
     * @param date The date to compare the `startDate` field against.
     * @return A list of `UserItinerary` documents for upcoming trips.
     */
    @Query("{'startDate':{'$gt':?0}}")
    public List<UserItinerary> getUpcomingTrips(String date);

     /**
     * Aggregates the popular destinations based on the number of times they appear in user itineraries.
     * Returns the top 6 most popular destinations.
     * 
     * @return A list of `PopularDestinations` with count and destination name.
     */
    @Aggregation(pipeline={"{'$group':{'_id':'$destination','count':{'$sum':1}}}", "{'$sort':{'count':-1}}", "{'$project':{'count':1, 'destination':'$_id'}}", "{'$limit':6}"})
    public List<AdminStatistics.PopularDestinations> getPopularDestination();
}
