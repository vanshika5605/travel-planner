package com.dgoil.travelPlanner.Repository;

import com.dgoil.travelPlanner.Model.DAO.PackingList;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface packingListRepo extends MongoRepository<PackingList,String> {
}
