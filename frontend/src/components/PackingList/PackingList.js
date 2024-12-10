import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TripDetailsBox from "../ItineraryPlanner/TripDetailsBox";
import backend from "../Utils/backend";
import NewItemModal from "./NewItemModal";
import "./PackingList.css";
import PrintShare from "./PrintShare";

// Packing List component to store packing list for a particular trip
const PackingList = ({errorMessage,
  setErrorMessage}) => {
  const location = useLocation();
  // State for trip details and packing list
  const [tripDetails, setTripDetails] = useState(
    location.state?.tripDetails || {
      destination: "Loading...",
      startDate: "",
      endDate: "",
      travelers: 0,
      tripType: "",
    }
  );
  const [packingList, setPackingList] = useState(
    location.state?.packingList || {
      essentials: [],
      clothing: [],
    }
  );
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const toggleItemPacked = (category, name) => {
    setPackingList((current) => ({
      ...current,
      [category]: current[category].map((item) =>
        item.name === name ? { ...item, packed: !item.packed } : item
      ),
    }));
  };

  const calculatePackedItemsCount = () => {
    let packedCount = 0;
    let totalCount = 0;
    Object.values(packingList).forEach((category) => {
      category.forEach((item) => {
        totalCount++;
        if (item.packed) packedCount++;
      });
    });
    return { packedCount, totalCount };
  };

  const { packedCount, totalCount } = calculatePackedItemsCount();

  const handleSaveChanges = async (tripId) => {
    try {
      setErrorMessage(null);
      await backend.savePackingList({
        tripID: tripId,
        packingList: packingList,
      });
      // Optionally show a success message
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setErrorMessage("Service unavailable. Please try again later.");
            break;
          default:
            setErrorMessage("An unknown error occurred.");
        }
      } else {
        setErrorMessage("Error: Could not connect to the server.");
      }
    }
  };

  useEffect(() => {
    setErrorMessage(null);
  }, []);

  return (
    <div className="packing-list-container">
      <TripDetailsBox tripDetails={tripDetails} />
      <div className="packing-list-content">
        <div className="packing-list-header">
          <h2>🧳 Packing List</h2>
          <PrintShare tripDetails={tripDetails} packingList={packingList} />
        </div>
        <div className="list-summary">
          <span className="item-count">
            {packedCount} of {totalCount} items packed
          </span>
          <button
            className="save-btn"
            onClick={() => handleSaveChanges(tripDetails.tripId)}
          >
            Save Changes
          </button>
        </div>
        <div className="list-items">
          {Object.entries(packingList).map(([category, items]) => (
            <div key={category} className="packing-category">
              <h5 className="category-title">{category}</h5>
              <div className="category-items">
                {items.map((item) => (
                  <label
                    key={`${category}-${item.name}`}
                    className={`item-checkbox ${item.packed ? "packed" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={item.packed}
                      onChange={() => toggleItemPacked(category, item.name)}
                    />
                    {item.name} (Qty: {item.quantity})
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <NewItemModal
          showAddItemModal={showAddItemModal}
          setShowAddItemModal={setShowAddItemModal}
          packingList={packingList}
          setPackingList={setPackingList}
        />
      </div>
    </div>
  );
};

export default PackingList;
