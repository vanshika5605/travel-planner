import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faUtensils, faBed, faHiking } from '@fortawesome/free-solid-svg-icons';
import './Itinerary.css'; // Import the CSS file

// Sample itinerary data
const initialData = {
  summary: '',
  itinerary: [
    {
      date: '2024-03-30',
      day: 'Day 1',
      activities: [
        { category: 'Travel', activity: 'Flight from Los Angeles to Vancouver' },
        { category: 'Hotel', activity: 'Check-in and Rest' },
        { category: 'Adventure', activity: 'Walk in Douglas Park' },
        { category: 'Adventure', activity: 'Lynn Canyon Jeep Excursion' },
      ],
      note: '',
    },
    {
      date: '2024-03-31',
      day: 'Day 2',
      activities: [
        { category: 'Adventure', activity: 'Hike in Grouse Mountain' },
        { category: 'Eat', activity: 'Dinner at Local Bistro' },
      ],
      note: '',
    },
  ],
  note: '',
};

// Mapping categories to icons
const categoryIcons = {
  Travel: faPlane,
  Adventure: faHiking,
  Eat: faUtensils,
  Hotel: faBed,
};

function Itinerary() {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState(0);

  // Handle drag and drop
  const handleDragEnd = (result, dayIndex) => {
    if (!result.destination) return;

    const items = Array.from(data.itinerary[dayIndex].activities);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const newItinerary = [...data.itinerary];
    newItinerary[dayIndex].activities = items;

    setData({ ...data, itinerary: newItinerary });
  };

  // Handle note change for each day
  const handleNoteChange = (dayIndex, value) => {
    const newItinerary = [...data.itinerary];
    newItinerary[dayIndex].note = value;
    setData({ ...data, itinerary: newItinerary });
  };

  // Copy to clipboard
// Updated copyToClipboard function
const copyToClipboard = () => {
    let formattedItinerary = 'Itinerary:\n\n';
    
    // Loop through each day in the itinerary and format it
    data.itinerary.forEach((day) => {
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
      <h1>Itinerary Planner</h1>
      
      {/* Tabs for each day */}
      <div className="tabs">
        {data.itinerary.map((day, index) => (
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
          {data.itinerary[activeTab].day} - {data.itinerary[activeTab].date}
        </h3>

        <DragDropContext onDragEnd={(result) => handleDragEnd(result, activeTab)}>
          <Droppable droppableId={`day-${activeTab}`}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {data.itinerary[activeTab].activities.map((activity, index) => (
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
          value={data.itinerary[activeTab].note}
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
