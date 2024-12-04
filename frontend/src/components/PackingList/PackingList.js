import React, { useMemo, useState } from "react";
import "./PackingList.css"; // We'll create this for custom styles
import NewItemModal from "./NewItemModal";
import PrintShare from "./PrintShare";
import TripDetailsBox from "../ItineraryPlanner/TripDetailsBox";

const PackingList = () => {
  const [tripDetails, setTripDetails] = useState({
    destination: "Maldives",
    startDate: "2024-12-15",
    endDate: "2024-12-22",
    travelers: 2,
    tripType: "Beach Vacation",
  });

  const [packingList, setPackingList] = useState({
    essentials: [
      { id: "passport", name: "Passport", quantity: 1, packed: false },
      { id: "wallet", name: "Wallet", quantity: 1, packed: false },
      {
        id: "phone-charger",
        name: "Phone Charger",
        quantity: 1,
        packed: false,
      },
    ],
    clothing: [
      { id: "t-shirts", name: "T-Shirts", quantity: 3, packed: false },
      { id: "underwear", name: "Underwear", quantity: 4, packed: false },
      { id: "socks", name: "Socks", quantity: 3, packed: false },
      { id: "pants", name: "Pants", quantity: 2, packed: false },
    ],
  });

  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const toggleItemPacked = (category, itemId) => {
    setPackingList((current) => ({
      ...current,
      [category]: current[category].map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      ),
    }));
  };

  // Pagination logic
  const paginatedItems = useMemo(() => {
    const allItems = Object.entries(packingList).flatMap(([category, items]) =>
      items.map((item) => ({ ...item, category }))
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return {
      items: allItems.slice(startIndex, endIndex),
      totalPages: Math.ceil(allItems.length / itemsPerPage),
    };
  }, [packingList, currentPage]);

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

  return (
    <div className="packing-list-container">
      <div className="trip-details">
        <div className="trip-info">
        <TripDetailsBox tripDetails={tripDetails}></TripDetailsBox>
        </div>
      </div>

      <div className="packing-list-content">
        <div className="packing-list-header">
          <h2>🧳 Packing List for {tripDetails.destination}</h2>
          <PrintShare
            tripDetails={tripDetails}
            packingList={packingList}
          ></PrintShare>
        </div>

        {Object.entries(packingList).map(([category, items]) => (
          <div key={category} className="packing-category">
            <h4 className="category-title">{category}</h4>
            <div className="category-items">
              {items
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item) => (
                  <label
                    key={item.id}
                    className={`item-checkbox ${item.packed ? "packed" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={item.packed}
                      onChange={() => toggleItemPacked(category, item.id)}
                    />
                    {item.name} (Qty: {item.quantity})
                  </label>
                ))}
            </div>
          </div>
        ))}

        <div className="list-actions">
          <button
            className="add-item-btn"
            onClick={() => setShowAddItemModal(true)}
          >
            + Add New Item
          </button>

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
          <button className="save-btn">Save Changes</button>
        </div>
        <NewItemModal
          showAddItemModal={showAddItemModal}
          setShowAddItemModal={setShowAddItemModal}
          packingList={packingList}
          setPackingList={setPackingList}
        ></NewItemModal>
      </div>
    </div>
  );
};

export default PackingList;
