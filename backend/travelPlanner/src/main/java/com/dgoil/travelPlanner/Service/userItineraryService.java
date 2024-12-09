package com.dgoil.travelPlanner.Service;

import ch.qos.logback.core.util.StringUtil;
import com.dgoil.travelPlanner.Model.DAO.UserDetails;
import com.dgoil.travelPlanner.Model.DAO.UserItinerary;
import com.dgoil.travelPlanner.Model.DTO.AdminStatistics;
import com.dgoil.travelPlanner.Model.DTO.UserTripData;
import com.dgoil.travelPlanner.Model.DTO.UserTripsDetails;
import com.dgoil.travelPlanner.Repository.userItineraryRepo;
import io.micrometer.common.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Service class responsible for managing user itineraries.
 * This includes retrieving, updating, and saving itinerary data for trips.
 */
@Service
@Slf4j
public class userItineraryService {
    @Autowired
    userItineraryRepo myUserItineraryRepo;
    @Lazy
    @Autowired
    userDetailsService userDetailsService;

    /**
     * Retrieves the itinerary of a user by the trip ID.
     * 
     * @param tripId The ID of the trip.
     * @return Optional containing UserItinerary if found.
     * @throws IllegalArgumentException if tripId is null or empty.
     */
    public Optional<UserItinerary> getUserItinerary(String tripId) {
        if (tripId == null || tripId.isEmpty()) {
            throw new IllegalArgumentException("tripId parameter is missing or empty.");
        }
        return myUserItineraryRepo.findByTripID(tripId);
    }

    /**
     * Retrieves detailed trip data including user details and itinerary for a given trip ID.
     * 
     * @param tripId The ID of the trip.
     * @return UserTripData containing trip and user details.
     */
    public UserTripData getUserTripData(String tripId) {
        UserTripData userTripData = new UserTripData();
        userTripData.setTripId(tripId);
        UserItinerary userItinerary = getUserItinerary(tripId).orElseGet(null);
        userTripData.setUserItinerary(userItinerary);
        if(!ObjectUtils.isEmpty(userItinerary)) {
            UserDetails userDetails =  userDetailsService.getUser(userItinerary.getEmail()).orElseGet(null);
            userTripData.setEmail(userItinerary.getEmail());
            userTripData.setUserDetails(userDetails);
        }

        return userTripData;
    }

    /**
     * Returns the number of past trips.
     * 
     * @return Integer count of past trips.
     */
    public Integer pastTrips() {
        return myUserItineraryRepo.getPastTrips(LocalDate.now().toString()).size();
    }

    /**
     * Returns the number of upcoming trips.
     * 
     * @return Integer count of upcoming trips.
     */
    public Integer upcomingTrips() {
        return myUserItineraryRepo.getUpcomingTrips(LocalDate.now().toString()).size();
    }

    /**
     * Retrieves the list of popular destinations.
     * 
     * @return List of popular destinations along with their visit counts.
     */
    public List<AdminStatistics.PopularDestinations> getPopularDestination() {
        return myUserItineraryRepo.getPopularDestination();
    }

    /**
     * Saves the user itinerary. If a TripID is not provided, a new one is generated.
     * If a trip with the provided TripID exists, it is updated.
     * 
     * @param userItinerary The itinerary to save or update.
     */
    public void saveUserItinerary(UserItinerary userItinerary){
        if(StringUtils.isEmpty(userItinerary.getTripID())) {
            // Generate a new TripID if not provided.
            String tripId = "TB-"+ UUID.randomUUID().toString().substring(0,4);
            userItinerary.setTripID(tripId);
            myUserItineraryRepo.insert(userItinerary);
        } else {
            // Update existing itinerary if TripID exists.
            Optional<UserItinerary> existingItinerary = myUserItineraryRepo.findByTripID(userItinerary.getTripID());
            if (existingItinerary.isPresent()) {
                UserItinerary existingItinerary1 = existingItinerary.get();
                existingItinerary1.setTripDetails(userItinerary.getTripDetails());
                myUserItineraryRepo.save(existingItinerary1);
                log.info("Successfully updated UserItinerary with TripID: {}", userItinerary.getTripID());
            } else {
                log.warn("No existing UserItinerary found with TripID: {}", userItinerary.getTripID());
                throw new IllegalArgumentException("Itinerary with the given TripID does not exist");
            }
        }
    }

    /**
     * Saves a user itinerary, either by creating a new one or updating an existing one.
     * 
     * @param userItinerary The itinerary to save.
     */
    public void saveItinerary(UserItinerary userItinerary) {
        myUserItineraryRepo.save(userItinerary);
    }

    /**
     * Retrieves the trip details for a user by their email.
     * 
     * @param email The user's email.
     * @return A UserTripsDetails object containing past, ongoing, and upcoming trips.
     * @throws IllegalArgumentException if the email is null or empty.
     */
    public UserTripsDetails getUserTripDetails(String email) {
        if (StringUtils.isEmpty(email)) {
            log.warn("Email is null or empty. Cannot retrieve trip details.");
            throw new IllegalArgumentException("Email cannot be null or empty.");
        }

        List<UserItinerary> tripDetails = myUserItineraryRepo.getUserTrips(email);
        if (tripDetails == null || tripDetails.isEmpty()) {
            log.info("No trip details found for email: {}", email);
            return new UserTripsDetails(email, new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        }
        UserTripsDetails userTripsDetails = new UserTripsDetails();
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // Filter and map trip details into past, upcoming, and ongoing trips
        List<UserTripsDetails.TripDetails> pastTripsDetails = mapToTripDetails(tripDetails.stream()
                .filter(trip -> LocalDate.parse(trip.getEndDate(), formatter).isBefore(today))
                .collect(Collectors.toList()));

        List<UserTripsDetails.TripDetails> upcomingTripsDetails = mapToTripDetails(tripDetails.stream()
                .filter(trip -> LocalDate.parse(trip.getStartDate(), formatter).isAfter(today))
                .collect(Collectors.toList()));
        
        // Filter for ongoing trips (today's trips)
        List<UserItinerary>  todayDetailsList = tripDetails.stream()
                .filter(trip -> !LocalDate.parse(trip.getStartDate(), formatter).isAfter(today) &&
                        !LocalDate.parse(trip.getEndDate(), formatter).isBefore(today))
                .collect(Collectors.toList());
        if(!todayDetailsList.isEmpty()) {
            List<UserItinerary.TripDetails.Itinerary> todayDetails = todayDetailsList.get(0).getTripDetails().getItinerary().stream()
                    .filter(trip -> LocalDate.parse(trip.getDate(), formatter).equals(today))
                    .collect(Collectors.toList());
            if(!todayDetails.isEmpty()) {
                userTripsDetails.setTodayActivities(todayDetails.get(0).getActivities());
            }
        }

        List<UserTripsDetails.TripDetails> onGoingTripsDetails = mapToTripDetails(todayDetailsList);

        userTripsDetails.setEmail(email);
        userTripsDetails.setOnGoingTrips(onGoingTripsDetails);
        userTripsDetails.setPastTrips(pastTripsDetails);
        userTripsDetails.setUpcomingTrips(upcomingTripsDetails);

        log.info("Successfully retrieved trip details for email: {}", email);
        return userTripsDetails;
    }

    /**
     * Maps a list of UserItinerary objects to a list of UserTripsDetails.TripDetails.
     * 
     * @param itineraries The list of UserItinerary objects to map.
     * @return A list of mapped trip details.
     */
    private List<UserTripsDetails.TripDetails> mapToTripDetails(List<UserItinerary> itineraries) {
        return itineraries.stream().map(trip -> {
            UserTripsDetails.TripDetails temp = new UserTripsDetails.TripDetails();
            temp.setTripId(trip.getTripID());
            temp.setDestination(trip.getDestination());
            temp.setIsPackingListCreated(trip.getIsPackingListCreated());
            temp.setStartDate(convertToReadableDate(trip.getStartDate()));
            temp.setEndDate(convertToReadableDate(trip.getEndDate()));
            temp.setBudget(trip.getBudget());
            temp.setGroupType(trip.getGroupType());
            return temp;
        }).collect(Collectors.toList());
    }

    /**
     * Converts a date string from the format "yyyy-MM-dd" to a readable format "d MMMM yyyy" with an ordinal suffix.
     * 
     * @param date The date string in "yyyy-MM-dd" format.
     * @return The formatted date string.
     */
    public static String convertToReadableDate(String date) {
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, inputFormatter);

        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("d MMMM yyyy");
        String formattedDate = localDate.format(outputFormatter);

        // Add ordinal suffix (st, nd, rd, th)
        int day = localDate.getDayOfMonth();
        String suffix;
        if (day >= 11 && day <= 13) {
            suffix = "th";
        } else {
            switch (day % 10) {
                case 1: suffix = "st"; break;
                case 2: suffix = "nd"; break;
                case 3: suffix = "rd"; break;
                default: suffix = "th"; break;
            }
        }

        return day + suffix + formattedDate.substring(formattedDate.indexOf(" "));
    }
}
