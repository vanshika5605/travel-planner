import React from 'react';
import './TripDetailsBox.css';

const TripDetailsBox = ({ tripDetails }) => {

  return (
    <div className="trip-details-box">
      {/* <h3 className="trip-title">Trip Details</h3> */}
      <h3>📍 Trip to {tripDetails.destination}</h3>
      <p><strong>Start Date:</strong> {tripDetails.startDate}</p>
      <p><strong>End Date:</strong> {tripDetails.endDate}</p>
      {/* <p><strong>Budget:</strong> ${budget}</p> */}
      <p><strong>Group Type:</strong> {tripDetails.groupType}</p>
    </div>
  );
};

export default TripDetailsBox;
