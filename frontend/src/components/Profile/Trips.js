import React, { useState, useEffect } from 'react';
import backend from "../Utils/backend";

const Trips = ({userData}) => {
  // State for trips (fetched from backend)
  const [trips, setTrips] = useState({
    upcomingTrips: [
        { destination: 'Paris, France', date: '2024-12-15' },
        { destination: 'Tokyo, Japan', date: '2025-03-05' },
      ],
      pastTrips: [
        { destination: 'London, UK', date: '2023-06-10' },
        { destination: 'Sydney, Australia', date: '2022-11-20' },
      ],
  });

  // Fetching trips from backend (dummy API call simulation)
  useEffect(() => {
    // Simulate a backend API call
    const fetchTrips = async () => {
      const response = await backend.getTrips(userData.email); 
      const data = await response.json();
      setTrips(data);
    };

    fetchTrips().catch((error) => console.error('Error fetching trips:', error));
  }, []);

  const handleGeneratePackingList = (trip) => {
    alert(`Generating packing list for ${trip.destination}`);
  };

  return (
    <>
      {/* Upcoming Trips */}
      <div className="trips-section">
        <h2>Upcoming Trips</h2>
        {trips.upcomingTrips.length > 0 ? (
          trips.upcomingTrips.map((trip, index) => (
            <div key={index} className="trip-card">
              <p><strong>Destination:</strong> {trip.destination}</p>
              <p><strong>Date:</strong> {trip.date}</p>
              <button onClick={() => handleGeneratePackingList(trip)}>
                Generate Packing List
              </button>
            </div>
          ))
        ) : (
          <p>No upcoming trips.</p>
        )}
      </div>

      {/* Past Trips */}
      <div className="trips-section">
        <h2>Past Trips</h2>
        {trips.pastTrips.length > 0 ? (
          trips.pastTrips.map((trip, index) => (
            <div key={index} className="trip-card">
              <p><strong>Destination:</strong> {trip.destination}</p>
              <p><strong>Date:</strong> {trip.date}</p>
              <button onClick={() => handleGeneratePackingList(trip)}>
                Generate Packing List
              </button>
            </div>
          ))
        ) : (
          <p>No past trips.</p>
        )}
      </div>
    </>
  );
};

export default Trips;
