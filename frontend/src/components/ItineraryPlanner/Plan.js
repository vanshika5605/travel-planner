import React, { useState } from "react";
import CurrencyConverter from "./CurrencyConverter";
import CustomCalendar from "./CustomCalendar";
import ItineraryPlanner from "./ItineraryPlanner";
import "./Plan.css";
import TravelStyleQuiz from "./TravelStyleQuiz";

// Plan component that gives the users two options - plan an itinerary or let us suggest you
const Plan = ({
  userId,
  holidays,
  longWeekends,
  rates,
  currencies,
  errorMessage,
  setErrorMessage,
}) => {
  const [isPlanModeOn, setIsPlanModeOn] = useState(false);
  const [planModeType, setPlanModeType] = useState("");

  // New function to handle going back to the initial screen
  const handleGoBack = () => {
    // alert("The generated itinerary will be lost");
    setIsPlanModeOn(false);
    setPlanModeType("");
  };

  return (
    <div>
      {isPlanModeOn ? (
        <></>
      ) : (
        <section className="take-a-break">
          <div className="image-grid-wrapper">
            <div className="image-grid">
              <div className="grid-1">
                <img
                  className="image-item"
                  src="https://umass-travel-buddy.s3.us-east-2.amazonaws.com/img5.jpg"
                  alt="Loading..."
                />
                <img
                  className="image-item"
                  src="https://umass-travel-buddy.s3.us-east-2.amazonaws.com/img6.jpg"
                  alt="Loading..."
                />
                <img
                  className="image-item"
                  src="https://umass-travel-buddy.s3.us-east-2.amazonaws.com/img7.jpg"
                  alt="Loading..."
                />
              </div>
              <div className="grid-2">
                <img
                  className="image-item"
                  src="https://umass-travel-buddy.s3.us-east-2.amazonaws.com/img8.jpg"
                  alt="Loading..."
                />
                <img
                  className="image-item"
                  src="https://umass-travel-buddy.s3.us-east-2.amazonaws.com/img9.jpg"
                  alt="Loading..."
                />
              </div>
              <div className="grid-3">
                <img
                  className="image-item"
                  src="https://umass-travel-buddy.s3.us-east-2.amazonaws.com/img10.jpg"
                  alt="Loading..."
                />
              </div>
            </div>

            <div className="text-content">
              <h1>Take a Break</h1>
              <p className="subtitle">
                Indulge in the freedom of exploration with our effortless
                booking platform.
              </p>
              <div className="button-group">
                <button
                  className="cta-button"
                  onClick={() => {
                    setIsPlanModeOn(true);
                    setPlanModeType("known");
                  }}
                >
                  I already know my dream destination
                </button>
                <button
                  className="cta-button"
                  onClick={() => {
                    setIsPlanModeOn(true);
                    setPlanModeType("unknown");
                  }}
                >
                  Need inspiration? Let us guide you
                </button>
              </div>
            </div>

            <div className="image-grid">
              <div className="grid-3">
                <img
                  className="image-item"
                  src="https://umass-travel-buddy.s3.us-east-2.amazonaws.com/img11.jpg"
                  alt="Loading..."
                />
              </div>

              <div className="grid-2">
                <img
                  className="image-item"
                  src="https://umass-travel-buddy.s3.us-east-2.amazonaws.com/img12.jpg"
                  alt="Loading..."
                />
                <img
                  className="image-item"
                  src="https://umass-travel-buddy.s3.us-east-2.amazonaws.com/img1.jpg"
                  alt="Loading..."
                />
              </div>
              <div className="grid-1">
                <img
                  className="image-item"
                  src="https://umass-travel-buddy.s3.us-east-2.amazonaws.com/img2.jpg"
                  alt="Loading..."
                />
                <img
                  className="image-item"
                  src="https://umass-travel-buddy.s3.us-east-2.amazonaws.com/img3.jpg"
                  alt="Loading..."
                />
                <img
                  className="image-item"
                  src="https://umass-travel-buddy.s3.us-east-2.amazonaws.com/img4.jpg"
                  alt="Loading..."
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="row">
          {isPlanModeOn ? (
            <div className="plan-mode-container">
              {/* Back button added to plan mode section */}
              <button className="back-button" onClick={handleGoBack}>
                ← Back to Options
              </button>
              <ItineraryPlanner
                userId={userId}
                formType={planModeType}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            </div>
          ) : (
            <>
              <div className="leftcolumn">
                <div className="card quiz-section">
                  <h2>Discover Your Travel Style</h2>
                  <TravelStyleQuiz />
                </div>
                <div className="card">
                  <CurrencyConverter rates={rates} currencies={currencies} />
                </div>
              </div>
              <div className="rightcolumn">
                <div className="card">
                  <CustomCalendar
                    holidays={holidays}
                    longWeekends={longWeekends}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Plan;
