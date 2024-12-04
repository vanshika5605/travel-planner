package com.dgoil.travelPlanner.Service;

import ch.qos.logback.core.util.StringUtil;
import com.dgoil.travelPlanner.Model.DAO.UserItinerary;
import com.dgoil.travelPlanner.Model.DTO.UserTripsDetails;
import com.dgoil.travelPlanner.Repository.userItineraryRepo;
import io.micrometer.common.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class userItineraryService {
    @Autowired
    userItineraryRepo myUserItineraryRepo;

    public Optional<UserItinerary> getUserItinerary(String tripId) {
        if (tripId == null || tripId.isEmpty()) {
            throw new IllegalArgumentException("tripId parameter is missing or empty.");
        }
        return myUserItineraryRepo.findByTripID(tripId);
    }

    public void saveUserItinerary(UserItinerary userItinerary){
        if(StringUtils.isEmpty(userItinerary.getTripID())) {
            String tripId = "TB-"+ UUID.randomUUID().toString().substring(0,4);
            userItinerary.setTripID(tripId);
            myUserItineraryRepo.insert(userItinerary);
        } else {
            Optional<UserItinerary> existingItinerary = myUserItineraryRepo.findByTripID(userItinerary.getTripID());
            if (existingItinerary.isPresent()) {
                userItinerary.set_id(existingItinerary.get().get_id());
                myUserItineraryRepo.save(userItinerary);
                log.info("Successfully updated UserItinerary with TripID: {}", userItinerary.getTripID());
            } else {
                log.warn("No existing UserItinerary found with TripID: {}", userItinerary.getTripID());
                throw new IllegalArgumentException("Itinerary with the given TripID does not exist");
            }
        }
    }

    public UserTripsDetails getUserTripDetails(String email) {
        if (StringUtils.isEmpty(email)) {
            log.warn("Email is null or empty. Cannot retrieve trip details.");
            throw new IllegalArgumentException("Email cannot be null or empty.");
        }

        List<UserItinerary> tripDetails = myUserItineraryRepo.getUserTrips(email);
        if (tripDetails == null || tripDetails.isEmpty()) {
            log.info("No trip details found for email: {}", email);
            return new UserTripsDetails(email, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        }

        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        List<UserTripsDetails.TripDetails> pastTripsDetails = mapToTripDetails(tripDetails.stream()
                .filter(trip -> LocalDate.parse(trip.getEndDate(), formatter).isBefore(today))
                .collect(Collectors.toList()));

        List<UserTripsDetails.TripDetails> upcomingTripsDetails = mapToTripDetails(tripDetails.stream()
                .filter(trip -> LocalDate.parse(trip.getStartDate(), formatter).isAfter(today))
                .collect(Collectors.toList()));

        List<UserTripsDetails.TripDetails> onGoingTripsDetails = mapToTripDetails(tripDetails.stream()
                .filter(trip -> !LocalDate.parse(trip.getStartDate(), formatter).isAfter(today) &&
                        !LocalDate.parse(trip.getEndDate(), formatter).isBefore(today))
                .collect(Collectors.toList()));

        UserTripsDetails userTripsDetails = new UserTripsDetails();
        userTripsDetails.setEmail(email);
        userTripsDetails.setOnGoingTrips(onGoingTripsDetails);
        userTripsDetails.setPastTrips(pastTripsDetails);
        userTripsDetails.setUpcomingTrips(upcomingTripsDetails);

        log.info("Successfully retrieved trip details for email: {}", email);
        return userTripsDetails;
    }

    private List<UserTripsDetails.TripDetails> mapToTripDetails(List<UserItinerary> itineraries) {
        return itineraries.stream().map(trip -> {
            UserTripsDetails.TripDetails temp = new UserTripsDetails.TripDetails();
            temp.setTripId(trip.getTripID());
            temp.setDestination(trip.getDestination());
            temp.setIsPackingListCreated(trip.getIsPackingListCreated());
            temp.setStartDate(convertToReadableDate(trip.getStartDate()));
            return temp;
        }).collect(Collectors.toList());
    }

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
