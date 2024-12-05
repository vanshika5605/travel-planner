package com.dgoil.travelPlanner.Repository;

import com.dgoil.travelPlanner.Model.DAO.UserDetails;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface userDetailsRepo extends MongoRepository<UserDetails,String> {
    Optional<UserDetails> findByEmail(String emailId);

}
