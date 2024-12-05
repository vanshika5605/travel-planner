import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TripDetailsBox from "../ItineraryPlanner/TripDetailsBox";
import backend from "../Utils/backend";
import NewItemModal from "./NewItemModal";
import "./PackingList.css";
import PrintShare from "./PrintShare";

const PackingList = () => {
  const { tripId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

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
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch trip details and packing list if not passed via navigation state
  useEffect(() => {
    const fetchTripDetails = async () => {
      // If no trip details were passed via navigation state, fetch them
      if (!location.state?.tripDetails) {
        try {
          const tripResponse = await backend.getTripDetails(tripId);
          const tripData = await tripResponse.json();
          setTripDetails(tripData);
        } catch (error) {
          console.error("Error fetching trip details:", error);
          // Optionally show an error message or redirect
          navigate("/trips");
        }
      }

      // If no packing list was passed via navigation state, fetch it
      if (!location.state?.packingList) {
        try {
          const packingListResponse = await backend.getPackingList(tripId);
          const packingListData = await packingListResponse.json();
          setPackingList(packingListData);
        } catch (error) {
          console.error("Error fetching packing list:", error);
          // Optionally show an error message
        }
      }
    };

    fetchTripDetails();
  }, [tripId, location.state, navigate]);

  const toggleItemPacked = (category, name) => {
    setPackingList((current) => ({
      ...current,
      [category]: current[category].map((item) =>
        item.name === name ? { ...item, packed: !item.packed } : item
      ),
    }));
  };

  const flattenedItems = useMemo(() => {
    return Object.entries(packingList).flatMap(([category, items]) =>
      items.map((item) => ({ ...item, category }))
    );
  }, [packingList]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {
      items: flattenedItems.slice(startIndex, endIndex),
      totalPages: Math.ceil(flattenedItems.length / itemsPerPage),
    };
  }, [flattenedItems, currentPage]);

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

  const handleSaveChanges = async (tripId) => {
    try {
      console.log(packingList)
      const response = await backend.savePackingList({tripID: tripId, packingList: packingList});
      // Optionally show a success message
    } catch (error) {
      console.error("Error saving packing list:", error);
      // Optionally show an error message
    }
  };

  const { packedCount, totalCount } = calculatePackedItemsCount();

  return (
    <div className="packing-list-container">
      <div className="trip-details">
        <div className="trip-info">
          <TripDetailsBox tripDetails={tripDetails} />
        </div>
      </div>

      <div className="packing-list-content">
        <div className="packing-list-header">
          <h2>🧳 Packing List for {tripDetails.destination}</h2>
          <PrintShare tripDetails={tripDetails} packingList={packingList} />
        </div>

        {Object.entries(packingList)
          .filter(([category]) =>
            paginatedItems.items.some((item) => item.category === category)
          )
          .map(([category, items]) => (
            <div key={category} className="packing-category">
              <h4 className="category-title">{category}</h4>
              <div className="category-items">
                {paginatedItems.items
                  .filter((item) => item.category === category)
                  .map((item) => (
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

        <div className="list-actions">
          <div className="pagination">
            {[...Array(paginatedItems.totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`page-btn ${
                  index + 1 === currentPage ? "active" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="list-summary">
          <span>
            {packedCount} of {totalCount} items packed
          </span>
          <button className="save-btn" onClick={() => handleSaveChanges(tripDetails.tripId)}>
            Save Changes
          </button>
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
