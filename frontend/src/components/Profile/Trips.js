import React from "react";
import PackingListButton from "./PackingListButton";

const Trips = ({
  userData,
  trips,
  handleGeneratePackingList,
  generatingPackingListForTripId,
}) => {
  const renderTripSection = (tripsArray, title) => (
    <div className="trips-section">
      <h2>{title}</h2>
      {tripsArray && tripsArray.length > 0 ? (
        tripsArray.map((trip) => (
          <div key={trip.tripId} className="trip-card">
            <div>
              <p>
                <strong>Destination:</strong> {trip.destination}
              </p>
              <p>
                <strong>Date:</strong> {trip.startDate}
              </p>
            </div>
            <div className="trip-button-section">
              {" "}
              <PackingListButton
                handleGeneratePackingList={handleGeneratePackingList}
                trip={trip}
                generatingPackingListForTripId={generatingPackingListForTripId}
              ></PackingListButton>
              <button className="generate-button">View Itinerary</button>
            </div>
          </div>
        ))
      ) : (
        <p>No {title.toLowerCase()}.</p>
      )}
    </div>
  );

  return (
    <>
      {renderTripSection(trips.upcomingTrips, "Upcoming Trips")}
      {renderTripSection(trips.pastTrips, "Past Trips")}
    </>
  );
};

export default Trips;
