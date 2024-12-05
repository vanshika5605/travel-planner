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

public interface userItineraryRepo extends MongoRepository<UserItinerary,String>{
    Optional<UserItinerary> findByTripID(String tripID);

    @Query("{'email':?0}")
    public List<UserItinerary> getUserTrips(String email);

    @Query("{'endDate':{'$lt':?0}}")
    public List<UserItinerary> getPastTrips(String date);

    @Query("{'startDate':{'$gt':?0}}")
    public List<UserItinerary> getUpcomingTrips(String date);

    @Aggregation(pipeline={"{'$group':{'_id':'$destination','count':{'$sum':1}}}", "{'$sort':{'count':-1}}", "{'$project':{'count':1, 'destination':'$_id'}}", "{'$limit':6}"})
    public List<AdminStatistics.PopularDestinations> getPopularDestination();
}
