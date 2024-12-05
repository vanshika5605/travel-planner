import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faUtensils,
  faBed,
  faHiking,
} from "@fortawesome/free-solid-svg-icons";
import "./Itinerary.css";
import TripDetailsBox from "./TripDetailsBox";
import backend from "../Utils/backend";

// Mapping categories to icons
const categoryIcons = {
  Travel: faPlane,
  Adventure: faHiking,
  Eat: faUtensils,
  Hotel: faBed,
};

const Itinerary = () => {
  const location = useLocation();
  
  // Extract data from location state with fallback
  const { formData, userId, itineraryData: initialItineraryData } = location.state || {
    formData: {},
    userId: '',
    itineraryData: {
      summary: "",
      itinerary: [],
      note: ""
    }
  };

  const [itineraryData, setItineraryData] = useState(initialItineraryData);
  const [activeTab, setActiveTab] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // Ensure we have at least one day when component loads
  useEffect(() => {
    if (!itineraryData.itinerary || itineraryData.itinerary.length === 0) {
      setItineraryData({
        summary: "",
        itinerary: [{
          date: new Date().toISOString().split('T')[0],
          day: "Day 1",
          activities: [],
          note: ""
        }],
        note: ""
      });
    }
  }, []);

  // Handle drag and drop
  const handleDragEnd = (result, dayIndex) => {
    if (!result.destination) return;

    const items = Array.from(itineraryData.itinerary[dayIndex].activities);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const newItinerary = [...itineraryData.itinerary];
    newItinerary[dayIndex].activities = items;

    setItineraryData({ ...itineraryData, itinerary: newItinerary });
  };

  // Handle note change for each day
  const handleNoteChange = (dayIndex, value) => {
    const newItinerary = [...itineraryData.itinerary];
    newItinerary[dayIndex].note = value;
    setItineraryData({ ...itineraryData, itinerary: newItinerary });
  };

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
    let tripData = { 
      ...formData, 
      email: userId, 
      tripDetails: itineraryData 
    };
    
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
      <h1>Itinerary</h1>

      <div className="trip-itinerary">
        <TripDetailsBox tripDetails={formData}></TripDetailsBox>
        <div>
          <div className="itinerary-container">
            {/* Tabs for each day */}
            <div className="tabs">
              {itineraryData.itinerary.map((day, index) => (
                <div
                  key={day.date}
                  onClick={() => setActiveTab(index)}
                  className={`tab ${activeTab === index ? "active" : ""}`}
                >
                  {day.day}
                </div>
              ))}
            </div>

            {/* Display active day's activities */}
            <div className="day-container">
              <h3>{itineraryData.itinerary[activeTab].date}</h3>

              <DragDropContext
                onDragEnd={(result) => handleDragEnd(result, activeTab)}
              >
                <Droppable droppableId={`day-${activeTab}`}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {itineraryData.itinerary[activeTab].activities.map(
                        (activity, index) => (
                          <Draggable
                            key={`${activity.activity}-${index}`}
                            draggableId={`${activity.activity}-${index}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="activity-item"
                                style={{
                                  ...provided.draggableProps.style,
                                }}
                              >
                                <div className="activity-content">
                                  <FontAwesomeIcon
                                    icon={categoryIcons[activity.category]}
                                    className="category-icon"
                                  />
                                  <span>{activity.activity}</span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        )
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              {/* Text area for notes */}
              <textarea
                placeholder="Add notes for this day..."
                value={itineraryData.itinerary[activeTab].note}
                onChange={(e) => handleNoteChange(activeTab, e.target.value)}
                className="note-textarea"
              />
            </div>

            {/* Button to copy itinerary */}
            <button onClick={copyToClipboard} className="copy-button">
              Copy Itinerary to Clipboard
            </button>
            <button onClick={saveTrip} className="copy-button">
              Save Trip
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Itinerary;