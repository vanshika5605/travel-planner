import React, { useState } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom"; // Import useNavigate
import backend from "../Utils/backend";
import "./ItineraryPlanner.css";
import ItineraryPlannerForm from "./ItineraryPlannerForm";

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
  const navigate = useNavigate(); // Initialize useNavigate
  const [itineraryData, setItineraryData] = useState(initialData);
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    groupType: "solo",
    customDetails: "",
  });

  const getItinerary = async () => {
    try {
      // Call API to generate itinerary
      // const response = await axios.post('/api/generate-itinerary', {
      //   userId: userId,
      //   ...formData
      // });

      // // Update local state with API response
      // const newItineraryData = response.data;
      // setItineraryData(newItineraryData);

      // Navigate to itinerary route with data in location state
      navigate('/itinerary', {
        state: {
          formData: formData,
          userId: userId,
          itineraryData: itineraryData
        }
      });

    } catch (error) {
      console.error('Error generating itinerary:', error);
      // Optionally handle error (show toast, set error state, etc.)
      // For example:
      // toast.error('Failed to generate itinerary. Please try again.');
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