import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import backend from "../Utils/backend";
import "./Itinerary.css";
import ItineraryBox from "./ItineraryBox";
import TripDetailsBox from "./TripDetailsBox";

const Itinerary = () => {
  const location = useLocation();

  // Extract data from location state with fallback
  const {
    tripData,
    userId,
    itineraryData: initialItineraryData,
  } = location.state || {
    tripData: {},
    userId: "",
    itineraryData: {
      summary: "",
      itinerary: [],
      note: "",
    },
  };

  const [itineraryData, setItineraryData] = useState(initialItineraryData);
  const [errorMessage, setErrorMessage] = useState("");

  // Ensure we have at least one day when component loads
  useEffect(() => {
    if (!itineraryData.itinerary || itineraryData.itinerary.length === 0) {
      setItineraryData({
        summary: "",
        itinerary: [
          {
            date: new Date().toISOString().split("T")[0],
            day: "Day 1",
            activities: [],
            note: "",
          },
        ],
        note: "",
      });
    }
  }, []);

  // Copy to clipboard
  const copyToClipboard = () => {
    let formattedItinerary = "Itinerary:\n\n";

    itineraryData.itinerary.forEach((day) => {
      formattedItinerary += `${day.day} - ${day.date}\n`;

      day.activities.forEach((activity) => {
        formattedItinerary += `  - ${activity.category}: ${activity.activity}\n`;
      });

      if (day.note) {
        formattedItinerary += `  Note: ${day.note}\n`;
      }

      formattedItinerary += "\n";
    });

    navigator.clipboard
      .writeText(formattedItinerary)
      .then(() => {
        alert("Itinerary copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const saveTrip = async () => {
    let tripDataNew = {
      ...tripData,
      email: userId,
      tripDetails: itineraryData,
    };

    try {
      const response = await backend.saveTrip(tripDataNew);
      if (response.status === 200) {
        console.log("Trip saved");
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setErrorMessage("Internal server error. Please try again later.");
            break;
          default:
            setErrorMessage("An unknown error occurred.");
        }
      } else {
        setErrorMessage("Error: Could not connect to the server.");
      }
    }
  };

  // Return null or loading state if no itinerary data
  if (!itineraryData.itinerary || itineraryData.itinerary.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="trip-itinerary">
        <TripDetailsBox tripDetails={tripData}></TripDetailsBox>
        <div className="itinerary-details-box">
          <div className="itinerary-container">
            <ItineraryBox
              itineraryData={itineraryData}
              setItineraryData={setItineraryData}
            ></ItineraryBox>
            {/* Button to copy itinerary */}
            <div className="itinerary-action-btn-section">
              <button onClick={copyToClipboard} className="copy-button">
                Copy Itinerary to Clipboard
              </button>
              <button onClick={saveTrip} className="copy-button">
                Save Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Itinerary;
