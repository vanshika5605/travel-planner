import {
  faBed,
  faCartShopping,
  faHiking,
  faPlane,
  faUtensils,
  faVanShuttle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./Itinerary.css";

// Mapping categories to icons
const categoryIcons = {
  Travel: faPlane,
  Adventure: faHiking,
  Food: faUtensils,
  Accommodation: faBed,
  Shopping: faCartShopping,
  Sightseeing: faVanShuttle,
};

const ItineraryBox = ({ itineraryData, setItineraryData }) => {
  const [activeTab, setActiveTab] = useState(0);

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

  return (
    <>
      <h2>Itinerary</h2>

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
        <h4>{itineraryData.itinerary[activeTab].date}</h4>

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
    </>
  );
};

export default ItineraryBox;
