package com.dgoil.travelPlanner.Respository;

import com.dgoil.travelPlanner.Model.UserDetails;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface userDetailsRepo extends MongoRepository<UserDetails,String> {

}
