import React, { useState } from "react";
import PackingListButton from "./PackingListButton";

// Trips component to show upcoming and past trips for a user
const Trips = ({
  userData,
  trips,
  handleGeneratePackingList,
  generatingPackingListForTripId,
  handleViewItinerary,
}) => {
  const [isUpcomingTripsVisible, setIsUpcomingTripsVisible] = useState(true);
  const [isPastTripsVisible, setIsPastTripsVisible] = useState(false);
  const [loading, setLoading] = useState({});

  const renderTripSection = (
    tripsArray,
    title,
    isVisible,
    toggleVisibility
  ) => (
    <div className="trips-section">
      <h2 onClick={toggleVisibility} className="collapsible-header">
        {title}{" "}
        {isVisible ? (
          <span style={{ fontSize: "12px", lineHeight: "1" }}>▼</span>
        ) : (
          <span style={{ fontSize: "12px", lineHeight: "1" }}>▶</span>
        )}
      </h2>
      {isVisible && (
        <div className="trip-display-section">
          {tripsArray && tripsArray.length > 0 ? (
            tripsArray.map((trip) => (
              <div key={trip.id} className="trip-card">
                <div>
                  <p>
                    <strong>Destination:</strong> {trip.destination}
                  </p>
                  <p>
                    <strong>Dates:</strong> {trip.startDate} - {trip.endDate}
                  </p>
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
                </div>
              </div>
            ))
          ) : (
            <p>No {title.toLowerCase()}.</p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      {renderTripSection(
        trips.upcomingTrips,
        "Upcoming Trips",
        isUpcomingTripsVisible,
        () => setIsUpcomingTripsVisible(!isUpcomingTripsVisible)
      )}
      {renderTripSection(
        trips.pastTrips,
        "Past Trips",
        isPastTripsVisible,
        () => setIsPastTripsVisible(!isPastTripsVisible)
      )}
    </>
  );
};

export default Trips;
