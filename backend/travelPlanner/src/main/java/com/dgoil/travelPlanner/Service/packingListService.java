package com.dgoil.travelPlanner.Service;

import com.dgoil.travelPlanner.Model.DAO.PackingList;
import com.dgoil.travelPlanner.Repository.packingListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class packingListService {
    @Autowired
    packingListRepo mypackingListRepo;

    public void saveList(PackingList packingList){
        mypackingListRepo.save(packingList);
    }
}
