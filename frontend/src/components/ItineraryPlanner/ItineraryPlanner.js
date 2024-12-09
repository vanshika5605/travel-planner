import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import backend from "../Utils/backend";
import "./ItineraryPlanner.css";
import ItineraryPlannerForm from "./ItineraryPlannerForm";

const ItineraryPlanner = ({ userId, formType }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    groupType: "solo",
    message: "",
  });

  const getItinerary = async (e) => {
    e.preventDefault();
    try {
      // Call API to generate itinerary
      const response = await backend.generateItinerary(formData);

      // Navigate to itinerary route with data in location state
      navigate("/itinerary", {
        state: {
          tripData: { ...formData, budget: response.data.itinerary.budget },
          userId: userId,
          itineraryData: response.data.itinerary,
        },
      });
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === "500") {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        setErrorMessage("Error generating itinerary");
      }
    }
  };

  return (
    <Container className="itinerary-container py-4">
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <ItineraryPlannerForm
        formType={formType}
        getItinerary={getItinerary}
        formData={formData}
        setFormData={setFormData}
      />
    </Container>
  );
};

export default ItineraryPlanner;
