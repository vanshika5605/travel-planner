import React, { useEffect, useMemo, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import backend from "../Utils/backend";
import "./ItineraryPlanner.css";
import ItineraryPlannerForm from "./ItineraryPlannerForm";

const ItineraryPlanner = ({
  userId,
  formType,
  errorMessage,
  setErrorMessage,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    groupType: "solo",
    message: "",
    email: userId,
  });

  const getItinerary = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true); // Show loading GIF
    try {
      const response = await backend.generateItinerary(formData);
      if(formType === "unknown"){
        const itinerary = response.data.itinerary;
        if (response.data.itinerary.length > 0) {
          navigate("/itinerary", {
            state: {
              tripData: { ...formData, budget: response.data.budget, startDate: itinerary[0].date, endDate: itinerary[itinerary.length - 1].date },
              userId: userId,
              itineraryData: response.data,
            },
          });
        }
      } else {
        navigate("/itinerary", {
          state: {
            tripData: { ...formData, budget: response.data.budget },
            userId: userId,
            itineraryData: response.data,
          },
        });
      }      
    } catch (error) {
      if (error.response && error.response.status === "500") {
        setErrorMessage("Internal server error. Please try again later.");
      } else {
        setErrorMessage("Error: Could not connect to the server.");
      }
    } finally {
      setLoading(false); // Hide loading GIF
    }
  };

  const isSubmitDisabled = useMemo(() => {
    if (formType === "unknown") {
      return !formData.message || formData.message.trim() === "";
    }
    return (
      !formData.destination ||
      formData.destination.trim() === "" ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.budget ||
      formData.budget === ""
    );
  }, [formType, formData]);

  useEffect(() => {
    setErrorMessage(null);
  }, []);

  return (
    <Container className="itinerary-container py-4">
      {loading ? (
        <div data-testid="loader-container" className="trip-loader-container">
          <img src="/loader.gif" alt="Loading..." />
        </div>
      ) : (
        <>
          <ItineraryPlannerForm
            formType={formType}
            formData={formData}
            setFormData={setFormData}
          />
          <Button
            type="submit"
            className="w-100"
            onClick={getItinerary}
            disabled={isSubmitDisabled}
          >
            {formType === "known" ? "Plan My Trip" : "Get Trip Recommendations"}
          </Button>
        </>
      )}
    </Container>
  );
};

export default ItineraryPlanner;
