package com.dgoil.travelPlanner.Repository;

import com.dgoil.travelPlanner.Model.DAO.UserItinerary;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Optional;

@DataMongoTest
class userItineraryRepoTest {

    @Autowired
    private userItineraryRepo userItineraryRepo;

    private UserItinerary mockUserItinerary;

    @BeforeEach
    void setUp() {
        mockUserItinerary = new UserItinerary();
        mockUserItinerary.setTripID("TB-1234");
        mockUserItinerary.setEmail("test@example.com");
        userItineraryRepo.save(mockUserItinerary);
    }

    @Test
    void testFindByTripID() {
        Optional<UserItinerary> result = userItineraryRepo.findByTripID("TB-1234");

        assertTrue(result.isPresent());
        assertEquals("TB-1234", result.get().getTripID());
    }

    @Test
    void testFindByEmail() {
        List<UserItinerary> result = userItineraryRepo.getUserTrips("test@example.com");

        assertFalse(result.isEmpty());
    }
}
