import React, { useState } from "react";
import backend from "../Utils/backend";
import Itinerary from "./Itinerary";
import "./ItineraryPlanner.css"; // Import the CSS file
import ItineraryPlannerForm from "./ItineraryPlannerForm";
import TripDetailsBox from "./TripDetailsBox";

const initialData = {
  summary: "",
  itinerary: [
    {
      date: "2024-03-30",
      day: "Day 1",
      activities: [
        {
          category: "Travel",
          activity: "Flight from Los Angeles to Vancouver",
        },
        { category: "Hotel", activity: "Check-in and Rest" },
        { category: "Adventure", activity: "Walk in Douglas Park" },
        { category: "Adventure", activity: "Lynn Canyon Jeep Excursion" },
      ],
      note: "",
    },
    {
      date: "2024-03-31",
      day: "Day 2",
      activities: [
        { category: "Adventure", activity: "Hike in Grouse Mountain" },
        { category: "Eat", activity: "Dinner at Local Bistro" },
      ],
      note: "",
    },
  ],
  note: "",
};

const ItineraryPlanner = ({ userId, formType }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [itineraryData, setItineraryData] = useState(initialData);
  const [itineraryGenerated, setItineraryGenerated] = useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    vacationType: "relaxed",
    groupType: "solo",
    customDetails: "",
  });

  const getItinerary = () => {
    //call api
    setItineraryGenerated(true);
  };

  const saveTrip = async() => {
    let tripData = { ...formData, email: userId, tripDetails: itineraryData };
    try {
      const response = await backend.saveTrip(tripData);
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

  return (
    <>
      {!itineraryGenerated ? (
        <>
          <ItineraryPlannerForm
            formType={formType}
            getItinerary={getItinerary}
            formData={formData}
            setFormData={setFormData}
          ></ItineraryPlannerForm>
        </>
      ) : (
        <>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <h1>Itinerary</h1>

          <div className="trip-itinerary">
            <TripDetailsBox tripDetails={formData}></TripDetailsBox>
            <div>
              <Itinerary
                itineraryData={itineraryData}
                setItineraryData={setItineraryData}
              ></Itinerary>
              <button onClick={saveTrip} className="copy-button">
                Save Trip
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ItineraryPlanner;
