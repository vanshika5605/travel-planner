import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faUtensils, faBed, faHiking } from '@fortawesome/free-solid-svg-icons';
import './Itinerary.css'; // Import the CSS file

// Mapping categories to icons
const categoryIcons = {
  Travel: faPlane,
  Adventure: faHiking,
  Eat: faUtensils,
  Hotel: faBed,
};

const Itinerary = ({itineraryData, setItineraryData}) => {
  const [activeTab, setActiveTab] = useState(0);

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
// Updated copyToClipboard function
const copyToClipboard = () => {
    let formattedItinerary = 'Itinerary:\n\n';
    
    // Loop through each day in the itinerary and format it
    itineraryData.itinerary.forEach((day) => {
      formattedItinerary += `${day.day} - ${day.date}\n`;
      
      // Loop through activities and format them
      day.activities.forEach((activity) => {
        formattedItinerary += `  - ${activity.category}: ${activity.activity}\n`;
      });
      
      // Add the note for the day if available
      if (day.note) {
        formattedItinerary += `  Note: ${day.note}\n`;
      }
      
      formattedItinerary += '\n'; // Add a space between days
    });
  
    // Copy the formatted string to the clipboard
    navigator.clipboard.writeText(formattedItinerary).then(() => {
      alert('Itinerary copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };  

  return (
    <div className="itinerary-container">      
      {/* Tabs for each day */}
      <div className="tabs">
        {itineraryData.itinerary.map((day, index) => (
          <div
            key={day.date}
            onClick={() => setActiveTab(index)}
            className={`tab ${activeTab === index ? 'active' : ''}`}
          >
            {day.day}
          </div>
        ))}
      </div>
      
      {/* Display active day's activities */}
      <div className="day-container">
        <h3>
          {itineraryData.itinerary[activeTab].date}
        </h3>

        <DragDropContext onDragEnd={(result) => handleDragEnd(result, activeTab)}>
          <Droppable droppableId={`day-${activeTab}`}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {itineraryData.itinerary[activeTab].activities.map((activity, index) => (
                  <Draggable key={`${activity.activity}-${index}`} draggableId={`${activity.activity}-${index}`} index={index}>
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
                ))}
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
      <button
        onClick={copyToClipboard}
        className="copy-button"
      >
        Copy Itinerary to Clipboard
      </button>
    </div>
  );
}

export default Itinerary;
