import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backend from "../Utils/backend";

const Trips = ({userData}) => {
  const navigate = useNavigate();
  
  // State for trips (fetched from backend)
  const [trips, setTrips] = useState({});

  // State to track which trip is generating a packing list
  const [generatingPackingListForTripId, setGeneratingPackingListForTripId] = useState(null);

  // Fetching trips from backend (dummy API call simulation)
  useEffect(() => {
    // Simulate a backend API call
    const fetchTrips = async () => {
      const response = await backend.getTrips(userData.email); 
      // const data = await response.json();
      console.log(response.data)
      setTrips(response.data.data);
    };

    fetchTrips().catch((error) => console.error('Error fetching trips:', error));
  }, []);

  const handleGeneratePackingList = async (trip) => {
    try {
      // Set the current trip as generating packing list
      setGeneratingPackingListForTripId(trip.tripId);
      let packingList;
      if(trip.isPackingListCreated){
        const response = await backend.getPackingList(trip.tripId);
        console.log(response)
        packingList = response.data.data.packingList;
      }

      // Parse the API response
      // const packingList = await response.json();

      // Navigate to packing list page with trip details and generated list
      navigate(`/packing-list/${trip.tripId}`, { 
        state: { 
          tripDetails: trip, 
          packingList: packingList 
        } 
      });
    } catch (error) {
      console.error('Error generating packing list:', error);
      // Optional: show error notification to user
    } finally {
      // Reset the generating state
      setGeneratingPackingListForTripId(null);
    }
  };

  const renderTripSection = (tripsArray, title) => (
    <div className="trips-section">
      <h2>{title}</h2>
      {tripsArray && tripsArray.length > 0 ? (
        tripsArray.map((trip) => (
          <div key={trip.tripId} className="trip-card">
            <div>
            <p><strong>Destination:</strong> {trip.destination}</p>
            <p><strong>Date:</strong> {trip.startDate}</p>
            </div>
            <button 
              onClick={() => handleGeneratePackingList(trip)}
              disabled={generatingPackingListForTripId === trip.tripId}
              className='generate-button'
            >
              {generatingPackingListForTripId === trip.tripId ? (
                <div className="loader">Generating...</div>
              ) : ( trip.isPackingListCreated?
                'View Packing List':'Generate Packing List'
              )}
            </button>
          </div>
        ))
      ) : (
        <p>No {title.toLowerCase()}.</p>
      )}
    </div>
  );

  return (
    <>
      {renderTripSection(trips.upcomingTrips, 'Upcoming Trips')}
      {renderTripSection(trips.pastTrips, 'Past Trips')}
    </>
  );
};

export default Trips;