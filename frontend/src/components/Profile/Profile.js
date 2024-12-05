import React, { useState } from 'react';
import './Profile.css';
import Trips from './Trips';

const Profile = ({ userData }) => {
    // State for user details
    const [staticUserData] = useState({
        name: '',
        email: '',
        gender: '',
        location: '',
        defaultCurrency: '',
        travelStats: {
            totalCountriesVisited: 12,
            totalCitiesVisited: 25,
            totalDistanceTraveled: '12000 miles',
            flightsTaken: 20,
        },
        travelGoals: {
            tripsPlanned: 5,
            newDestinations: 3,
            travelMiles: '10,000 km',
        },
    });

    const [ongoingTrips, setOngoingTrips] = useState([
        {
            id: 1,
            destination: 'New York, USA',
            startDate: '12-01-2024',
            endDate: '12-10-2024',
            activities: ['Visit Times Square', 'Central Park Walk', 'Dinner at Katz’s Deli'],
        },
    ]);
    return (
        <div className="profile-page">
            {/* Main Profile Section */}
            <div className="profile-main">

                {/* Profile Information */}
                <div className="profile-info">
                    <h2>Profile Details</h2>
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Gender:</strong> {userData.gender}</p>
                    <p><strong>Location:</strong> {userData.location}</p>
                    <p><strong>Default Currency:</strong> {userData.defaultCurrency}</p>
                </div>
                {/* Trips Section */}
                <Trips userData={userData} />
            </div>

            {/* Sidebar with Statistics and Goals */}
            <div className="profile-sidebar">
            <div className="ongoing-trips">
                    <h2>Ongoing Trip</h2>
                    {ongoingTrips.length > 0 ? (
                        ongoingTrips.map((trip) => (
                            <div key={trip.id} className="ongoing-trip-card">
                                <h3>{trip.destination}</h3>
                                <p><strong>Start Date:</strong> {trip.startDate}</p>
                                <p><strong>End Date:</strong> {trip.endDate}</p>
                                <p><strong>Activities Planned for Today:</strong></p>
                                <ul>
                                    {trip.activities.map((activity, index) => (
                                        <li key={index}>{activity}</li>
                                    ))}
                                </ul>
                            </div>
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

                {/* <div className="travel-goals">
                    <h2>Travel Goals</h2>
                    <div className="goals-item">
                        <h3>{staticUserData.travelGoals.tripsPlanned}</h3>
                        <p>Trips Planned</p>
                    </div>
                    <div className="goals-item">
                        <h3>{staticUserData.travelGoals.newDestinations}</h3>
                        <p>New Destinations</p>
                    </div>
                    <div className="goals-item">
                        <h3>{staticUserData.travelGoals.travelMiles}</h3>
                        <p>Miles to Travel</p>
                    </div>
                </div> */}

            </div>
        </div>
    );
};

export default Profile;
