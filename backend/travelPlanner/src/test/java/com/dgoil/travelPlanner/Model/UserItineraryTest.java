package com.dgoil.travelPlanner.Model;

import com.dgoil.travelPlanner.Model.DAO.UserItinerary;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;

public class UserItineraryTest {

    private UserItinerary userItinerary;

    @BeforeEach
    void setUp() {
        userItinerary = new UserItinerary();
        userItinerary.setTripID("TB-1234");
        userItinerary.setEmail("test@example.com");
        userItinerary.setDestination("Paris");
        userItinerary.setMood("Excited");
        userItinerary.setGroupType("Friends");
        userItinerary.setStartDate("2024-12-01");
        userItinerary.setEndDate("2024-12-10");
        userItinerary.setIsPackingListCreated(true);
        userItinerary.setBudget(new UserItinerary.Budget(500, 100, 400, 300, 150));

        UserItinerary.TripDetails tripDetails = new UserItinerary.TripDetails();
        tripDetails.setSummary("A fun trip to Paris.");
        UserItinerary.TripDetails.Itinerary itinerary = new UserItinerary.TripDetails.Itinerary();
        itinerary.setDate("2024-12-02");
        itinerary.setDay("Day 1");
        itinerary.setWeekDay("Monday");
        itinerary.setNotes("Visit Eiffel Tower");

        UserItinerary.TripDetails.Itinerary.Activities activity = new UserItinerary.TripDetails.Itinerary.Activities();
        activity.setCategory("Sightseeing");
        activity.setActivity("Eiffel Tower");

        itinerary.setActivities(Arrays.asList(activity));
        tripDetails.setItinerary(Arrays.asList(itinerary));
        userItinerary.setTripDetails(tripDetails);
    }

    @Test
    void testUserItineraryCreation() {
        // Assert that all required fields are properly initialized
        assertNotNull(userItinerary.getTripID());
        assertEquals("TB-1234", userItinerary.getTripID());
        assertEquals("test@example.com", userItinerary.getEmail());
        assertEquals("Paris", userItinerary.getDestination());
        assertEquals("Excited", userItinerary.getMood());
        assertEquals("Friends", userItinerary.getGroupType());
        assertEquals("2024-12-01", userItinerary.getStartDate());
        assertEquals("2024-12-10", userItinerary.getEndDate());
        assertTrue(userItinerary.getIsPackingListCreated());
    }

    @Test
    void testBudget() {
        // Assert that the budget is correctly set
        UserItinerary.Budget budget = userItinerary.getBudget();
        assertNotNull(budget);
        assertEquals(500, budget.getActivities());
        assertEquals(100, budget.getMiscellaneous());
        assertEquals(400, budget.getAccommodation());
        assertEquals(300, budget.getFood());
        assertEquals(150, budget.getTravel());
    }

    @Test
    void testTripDetails() {
        // Assert the trip details
        UserItinerary.TripDetails tripDetails = userItinerary.getTripDetails();
        assertNotNull(tripDetails);
        assertEquals("A fun trip to Paris.", tripDetails.getSummary());

        // Check the itinerary for Day 1
        List<UserItinerary.TripDetails.Itinerary> itineraryList = tripDetails.getItinerary();
        assertNotNull(itineraryList);
        assertEquals(1, itineraryList.size());
        UserItinerary.TripDetails.Itinerary itinerary = itineraryList.get(0);
        assertEquals("2024-12-02", itinerary.getDate());
        assertEquals("Day 1", itinerary.getDay());
        assertEquals("Monday", itinerary.getWeekDay());
        assertEquals("Visit Eiffel Tower", itinerary.getNotes());

        // Check the activities for Day 1
        List<UserItinerary.TripDetails.Itinerary.Activities> activitiesList = itinerary.getActivities();
        assertNotNull(activitiesList);
        assertEquals(1, activitiesList.size());
        UserItinerary.TripDetails.Itinerary.Activities activity = activitiesList.get(0);
        assertEquals("Sightseeing", activity.getCategory());
        assertEquals("Eiffel Tower", activity.getActivity());
    }

    @Test
    void testSetTripID() {
        // Test the setter for tripID
        userItinerary.setTripID("TB-5678");
        assertEquals("TB-5678", userItinerary.getTripID());
    }

    @Test
    void testSetMood() {
        // Test the setter for mood
        userItinerary.setMood("Relaxed");
        assertEquals("Relaxed", userItinerary.getMood());
    }

    @Test
    void testSetStartDate() {
        // Test the setter for start date
        userItinerary.setStartDate("2024-12-15");
        assertEquals("2024-12-15", userItinerary.getStartDate());
    }

    @Test
    void testSetEndDate() {
        // Test the setter for end date
        userItinerary.setEndDate("2024-12-20");
        assertEquals("2024-12-20", userItinerary.getEndDate());
    }

    @Test
    void testTripDetailsSetSummary() {
        // Test setter for trip details summary
        userItinerary.getTripDetails().setSummary("A beautiful trip to Paris.");
        assertEquals("A beautiful trip to Paris.", userItinerary.getTripDetails().getSummary());
    }
}
