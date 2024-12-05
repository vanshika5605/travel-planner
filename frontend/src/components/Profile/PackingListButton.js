import React from "react";
import "./Profile.css";

const PackingListButton = ({
  handleGeneratePackingList,
  trip,
  generatingPackingListForTripId,
}) => {
  return (
    <button
      onClick={() => handleGeneratePackingList(trip)}
      disabled={generatingPackingListForTripId === trip.tripId}
      className="generate-button"
    >
      {generatingPackingListForTripId === trip.tripId ? (
        <div className="loader">Loading...</div>
      ) : trip.isPackingListCreated ? (
        "View Packing List"
      ) : (
        "Generate Packing List"
      )}
    </button>
  );
};

export default PackingListButton;
