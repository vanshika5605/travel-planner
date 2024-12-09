import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./ItineraryPlanner.css";
import ItineraryPlannerForm from "./ItineraryPlannerForm";
import backend from "../Utils/backend";

const ItineraryPlanner = ({ userId, formType }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    groupType: "solo",
    customDetails: "",
  });

  const getItinerary = async (e) => {
    e.preventDefault();
    try {
      // Call API to generate itinerary
      const response = await backend.generateItinerary(formData); 

      // Navigate to itinerary route with data in location state
      navigate('/itinerary', {
        state: {
          tripData: {...formData, budget: response.data.itinerary.budget},
          userId: userId,
          itineraryData: response.data.itinerary
        }
      });

    } catch (error) {
      console.error('Error generating itinerary:', error);
    }
  };

  return (
    <>
      <ItineraryPlannerForm
        formType={formType}
        getItinerary={getItinerary}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
};

export default ItineraryPlanner;