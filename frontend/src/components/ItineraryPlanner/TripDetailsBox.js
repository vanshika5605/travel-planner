import React from 'react';
import './TripDetailsBox.css';

// Trip Details Box component that shows information about the trip and budget details
const TripDetailsBox = ({ tripDetails }) => {
  const { activities, miscellaneous, accommodation, food, travel } = tripDetails.budget || {};
  const totalBudget = activities + miscellaneous + accommodation + food + travel;

  return (
    <div className="trip-details-box">
      <h3>📍 Trip to {tripDetails.destination}</h3>
      <p><strong>Start Date:</strong> {tripDetails.startDate}</p>
      <p><strong>End Date:</strong> {tripDetails.endDate}</p>
      <p><strong>Group Type:</strong> {tripDetails.groupType}</p>
      
      <h4>💰 Budget</h4>
      <ul>
        <li><strong>Activities:</strong> ${activities}</li>
        <li><strong>Miscellaneous:</strong> ${miscellaneous}</li>
        <li><strong>Accommodation:</strong> ${accommodation}</li>
        <li><strong>Food:</strong> ${food}</li>
        <li><strong>Travel:</strong> ${travel}</li>
      </ul>
      <p><strong>Total Budget:</strong> ${totalBudget}</p>
    </div>
  );
};

export default TripDetailsBox;
