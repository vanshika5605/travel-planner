import {
  faBed,
  faCartShopping,
  faHiking,
  faPlane,
  faUtensils,
  faVanShuttle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backend from "../Utils/backend";
import PackingListButton from "./PackingListButton";
import "./Profile.css";
import Trips from "./Trips";

const categoryIcons = {
  Travel: faPlane,
  Adventure: faHiking,
  Food: faUtensils,
  Hotel: faBed,
  Shopping: faCartShopping,
  Sightseeing: faVanShuttle,
};

    const Profile = ({ userData }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState({});
    const [trips, setTrips] = useState({});
    const [generatingPackingListForTripId, setGeneratingPackingListForTripId] =
        useState(null);
    // State for user details
    const [staticUserData] = useState({
        travelStats: {
        totalCountriesVisited: 12,
        totalCitiesVisited: 25,
        totalDistanceTraveled: "12000 miles",
        flightsTaken: 20,
        },
        travelGoals: {
        tripsPlanned: 5,
        newDestinations: 3,
        travelMiles: "10,000 km",
        },
    });

    useEffect(() => {
        const fetchTrips = async () => {
        const response = await backend.getTrips(userData.email);
        setTrips(response.data.data);
        };

        fetchTrips().catch((error) =>
        console.error("Error fetching trips:", error)
        );
    }, []);

  const handleGeneratePackingList = async (trip) => {
    try {
      // Set the current trip as generating packing list
      setGeneratingPackingListForTripId(trip.tripId);
      let packingList;
      if (trip.isPackingListCreated) {
        const response = await backend.getPackingList(trip.tripId);
        packingList = response.data.data.packingList;
      }

      navigate("/packing-list/${trip.tripId}", {
        state: {
          tripDetails: trip,
          packingList: packingList,
        },
      });
    } catch (error) {
      console.error("Error generating packing list:", error);
    } finally {
      // Reset the generating state
      setGeneratingPackingListForTripId(null);
    }
  };

  const handleViewItinerary = async (trip) => {
    try {
      // Set loading state for the specific trip
      setLoading((prev) => ({ ...prev, [trip.id]: true }));

      // Assuming you have an API endpoint to fetch trip details
      const response = await backend.getTripDetails(trip.tripId);
      // Navigate to itinerary page with trip data
      navigate("/itinerary", {
        state: {
          tripData: response.data.data,
          userId: userData.id,
          itineraryData: response.data.data.tripDetails,
        },
      });
    } catch (error) {
      console.error("Error fetching itinerary:", error);
      // Optionally show an error message to the user
      alert("Failed to load itinerary. Please try again.");
    } finally {
      // Clear loading state
      setLoading((prev) => ({ ...prev, [trip.id]: false }));
    }
  };

    return (
        <div className="profile-page">
        {/* Main Profile Section */}
        <div className="profile-main">
            {/* Profile Information */}
            <div className="profile-info">
            <h2>Profile Details</h2>
            <p>
                <strong>Name:</strong> {userData.name}
            </p>
            <p>
                <strong>Email:</strong> {userData.email}
            </p>
            <p>
                <strong>Gender:</strong> {userData.gender}
            </p>
            <p>
                <strong>Location:</strong> {userData.location}
            </p>
            <p>
                <strong>Default Currency:</strong> {userData.defaultCurrency}
            </p>
            </div>
            {/* Trips Section */}
            <Trips
            userData={userData}
            trips={trips}
            handleGeneratePackingList={handleGeneratePackingList}
            generatingPackingListForTripId={generatingPackingListForTripId}
            handleViewItinerary={handleViewItinerary}
            />
        </div>

      {/* Sidebar with Statistics and Goals */}
      <div className="profile-sidebar">
        <div className="ongoing-trips">
          <h2>Ongoing Trip</h2>
          {trips.onGoingTrips && trips.onGoingTrips.length > 0 ? (
            trips.onGoingTrips.map((trip) => (
              <>
                <div key={trip.id} className="ongoing-trip-card">
                  <h3>📍 Trip to {trip.destination}</h3>
                  <p>
                    <strong>Start Date:</strong> {trip.startDate}
                  </p>
                  <p>
                    <strong>End Date:</strong> {trip.endDate}
                  </p>
                  <p>
                    <strong>Activities Planned for Today:</strong>
                  </p>
                  {trips.todayActivities && trips.todayActivities.length > 0 ? (
                    <ul className="no-bullets">
                      {trips.todayActivities.map((activity, index) => (
                        <p key={index}>
                          <strong>
                            <FontAwesomeIcon
                              icon={categoryIcons[activity.category]}
                              className="category-icon"
                            />
                          </strong>{" "}
                          {activity.activity}
                        </p>
                      ))}
                    </ul>
                  ) : (
                    <p>No activities planned for today.</p>
                  )}
                </div>
                <div className="trip-button-section">
                  <PackingListButton
                    handleGeneratePackingList={handleGeneratePackingList}
                    trip={trip}
                    generatingPackingListForTripId={
                      generatingPackingListForTripId
                    }
                  />
                  <button
                    className="generate-button"
                    onClick={() => handleViewItinerary(trip)}
                    disabled={loading[trip.id]}
                  >
                    {loading[trip.id] ? "Loading..." : "View Itinerary"}
                  </button>
                </div>{" "}
              </>
            ))
          ) : (
            <p>No ongoing trips.</p>
          )}
        </div>
        <div className="travel-stats">
          <h2>Travel Statistics</h2>
          <div className="stats-item">
            <h3>{staticUserData.travelStats.totalCountriesVisited}</h3>
            <p>Countries Visited</p>
          </div>
          <div className="stats-item">
            <h3>{staticUserData.travelStats.totalCitiesVisited}</h3>
            <p>Cities Visited</p>
          </div>
          <div className="stats-item">
            <h3>{staticUserData.travelStats.totalDistanceTraveled}</h3>
            <p>Total Distance Traveled</p>
          </div>
          <div className="stats-item">
            <h3>{staticUserData.travelStats.flightsTaken}</h3>
            <p>Flights Taken</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
