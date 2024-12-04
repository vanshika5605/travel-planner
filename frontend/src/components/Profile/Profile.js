import React from 'react';
import './Profile.css';

const Profile = () => {
  // Dummy data for demonstration
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    gender: "Male",
    location: "New York, USA",
    defaultCurrency: "USD",
    upcomingTrips: [
      { destination: "Paris, France", date: "2024-12-15" },
      { destination: "Tokyo, Japan", date: "2025-03-05" },
    ],
    pastTrips: [
      { destination: "London, UK", date: "2023-06-10" },
      { destination: "Sydney, Australia", date: "2022-11-20" },
    ],
    travelStats: {
      totalCountriesVisited: 12,
      totalCitiesVisited: 35,
      totalDistanceTraveled: "45,000 km",
      flightsTaken: 20,
    },
    travelGoals: {
      tripsPlanned: 5,
      newDestinations: 3,
      travelMiles: "10,000 km",
    },
  };

  const handleGeneratePackingList = (trip) => {
    alert(`Generating packing list for ${trip.destination}`);
  };

  return (
    <div className="profile-page">
      {/* Main Content */}
      <div className="profile-main">
        {/* <div className="profile-header">
          <h1>Welcome, {user.name}!</h1>
        </div> */}

        {/* Profile Information */}
        <div className="profile-info">
          <h2>Profile Details</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Location:</strong> {user.location}</p>
          <p><strong>Default Currency:</strong> {user.defaultCurrency}</p>
        </div>

        {/* Upcoming Trips */}
        <div className="trips-section">
          <h2>Upcoming Trips</h2>
          {user.upcomingTrips.map((trip, index) => (
            <div key={index} className="trip-card">
              <p><strong>Destination:</strong> {trip.destination}</p>
              <p><strong>Date:</strong> {trip.date}</p>
              <button onClick={() => handleGeneratePackingList(trip)}>
                Generate Packing List
              </button>
            </div>
          ))}
        </div>

        {/* Past Trips */}
        <div className="trips-section">
          <h2>Past Trips</h2>
          {user.pastTrips.map((trip, index) => (
            <div key={index} className="trip-card">
              <p><strong>Destination:</strong> {trip.destination}</p>
              <p><strong>Date:</strong> {trip.date}</p>
              <button onClick={() => handleGeneratePackingList(trip)}>
                Generate Packing List
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="profile-sidebar">
        <div className="travel-stats">
          <h2>Travel Statistics</h2>
          <div className="stats-item">
            <h3>{user.travelStats.totalCountriesVisited}</h3>
            <p>Countries Visited</p>
          </div>
          <div className="stats-item">
            <h3>{user.travelStats.totalCitiesVisited}</h3>
            <p>Cities Visited</p>
          </div>
          <div className="stats-item">
            <h3>{user.travelStats.totalDistanceTraveled}</h3>
            <p>Total Distance Traveled</p>
          </div>
          <div className="stats-item">
            <h3>{user.travelStats.flightsTaken}</h3>
            <p>Flights Taken</p>
          </div>
        </div>

        <div className="travel-goals">
          <h2>Travel Goals</h2>
          <div className="goals-item">
            <h3>{user.travelGoals.tripsPlanned}</h3>
            <p>Trips Planned</p>
          </div>
          <div className="goals-item">
            <h3>{user.travelGoals.newDestinations}</h3>
            <p>New Destinations</p>
          </div>
          <div className="goals-item">
            <h3>{user.travelGoals.travelMiles}</h3>
            <p>Miles to Travel</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
