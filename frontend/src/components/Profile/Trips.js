import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PackingListButton from "./PackingListButton";
import backend from "../Utils/backend";

const Trips = ({
  userData,
  trips,
  handleGeneratePackingList,
  generatingPackingListForTripId,
}) => {
  const navigate = useNavigate();
  const [isUpcomingTripsVisible, setIsUpcomingTripsVisible] = useState(true);
  const [isPastTripsVisible, setIsPastTripsVisible] = useState(false);
  const [loading, setLoading] = useState({});

  const handleViewItinerary = async (trip) => {
    try {
      // Set loading state for the specific trip
      setLoading(prev => ({ ...prev, [trip.id]: true }));

      // Assuming you have an API endpoint to fetch trip details
      const response = await backend.getTripDetails(trip.tripId);
      console.log(response.data)
      // Navigate to itinerary page with trip data
      navigate('/itinerary', {
        state: {
          tripData: response.data.data,
          userId: userData.id,
          itineraryData: response.data.data.tripDetails
        }
      });
    } catch (error) {
      console.error('Error fetching itinerary:', error);
      // Optionally show an error message to the user
      alert('Failed to load itinerary. Please try again.');
    } finally {
      // Clear loading state
      setLoading(prev => ({ ...prev, [trip.id]: false }));
    }
  };

  const renderTripSection = (tripsArray, title, isVisible, toggleVisibility) => (
    <div className="trips-section">
      <h2 onClick={toggleVisibility} className="collapsible-header">
        {title} {isVisible ? <span style={{ fontSize: '12px', lineHeight: '1' }}>▼</span> : <span style={{ fontSize: '12px', lineHeight: '1' }}>▶</span>}
      </h2>
      {isVisible && (
        <>
          {tripsArray && tripsArray.length > 0 ? (
            tripsArray.map((trip) => (
              <div key={trip.id} className="trip-card">
                <div>
                  <p><strong>Destination:</strong> {trip.destination}</p>
                  <p><strong>Date:</strong> {trip.startDate}</p>
                </div>
                <div className="trip-button-section">
                  <PackingListButton
                    handleGeneratePackingList={handleGeneratePackingList}
                    trip={trip}
                    generatingPackingListForTripId={generatingPackingListForTripId}
                  />
                  <button 
                    className="generate-button"
                    onClick={() => handleViewItinerary(trip)}
                    disabled={loading[trip.id]}
                  >
                    {loading[trip.id] ? 'Loading...' : 'View Itinerary'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No {title.toLowerCase()}.</p>
          )}
        </>
      )}
    </div>
  );

  return (
    <>
      {renderTripSection(trips.upcomingTrips, 'Upcoming Trips', isUpcomingTripsVisible, () => setIsUpcomingTripsVisible(!isUpcomingTripsVisible))}
      {renderTripSection(trips.pastTrips, 'Past Trips', isPastTripsVisible, () => setIsPastTripsVisible(!isPastTripsVisible))}
    </>
  );
};

export default Trips;