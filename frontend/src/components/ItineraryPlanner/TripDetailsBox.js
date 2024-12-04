import React from 'react';
import './TripDetailsBox.css';

const TripDetailsBox = ({ tripDetails }) => {
  const {
    destination,
    startDate,
    endDate,
    budget,
    vacationType,
    groupType,
    travellers,
  } = tripDetails;

  return (
    <div className="trip-details-box">
      <h3 className="trip-title">Trip Details</h3>
      <p><strong>Destination:</strong> {destination}</p>
      <p><strong>Start Date:</strong> {startDate}</p>
      <p><strong>End Date:</strong> {endDate}</p>
      <p><strong>Budget:</strong> ${budget}</p>
      <p><strong>Vacation Type:</strong> {vacationType}</p>
      <p><strong>Group Type:</strong> {groupType}</p>
      <p><strong>Travellers:</strong> {travellers}</p>
    </div>
  );
};

export default TripDetailsBox;
