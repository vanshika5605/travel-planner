package com.dgoil.travelPlanner.Repository;

import com.dgoil.travelPlanner.Model.DAO.PackingList;
import com.dgoil.travelPlanner.Model.DAO.PackingList.PackingObj;
import com.dgoil.travelPlanner.Model.DAO.PackingList.PackingObj.Item;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

import java.util.Arrays;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataMongoTest
public class packingListRepoTest {

    @Autowired
    private packingListRepo packingListRepo;

    @Test
    public void testGetByTripId_Success() {
        PackingList packingList = createPackingList();
        packingListRepo.save(packingList);

        Optional<PackingList> result = packingListRepo.getByTripId("123");

        assertThat(result).isPresent();
        assertThat(result.get().getTripID()).isEqualTo("123");
    }

    @Test
    public void testGetByTripId_Failure() {
        Optional<PackingList> result = packingListRepo.getByTripId("non-existent");

        assertThat(result).isEmpty();
    }

    private PackingList createPackingList() {
        Item item = new Item("Passport", 1, false);
        PackingObj packingObj = new PackingObj(
                Arrays.asList(item), Arrays.asList(item), Arrays.asList(item), Arrays.asList(item), Arrays.asList(item)
        );
        return new PackingList("1", "123", packingObj);
    }
}
