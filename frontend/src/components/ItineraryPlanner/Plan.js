import React, { useState } from "react";
import CurrencyConverter from "./CurrencyConverter";
import CustomCalendar from "./CustomCalendar";
import ItineraryPlanner from "./ItineraryPlanner";
import "./Plan.css";
import TravelStyleQuiz from "./TravelStyleQuiz";

const Plan = ({ userId, holidays, longWeekends, rates, currencies }) => {
  const [isPlanModeOn, setIsPlanModeOn] = useState(false);
  const [planModeType, setPlanModeType] = useState("");

  // New function to handle going back to the initial screen
  const handleGoBack = () => {
    alert("The generated itinerary will be lost");
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
                  src="/images/img5.jpg"
                  alt="Loading..."
                />
                <img
                  className="image-item"
                  src="/images/img6.jpg"
                  alt="Loading..."
                />
                <img
                  className="image-item"
                  src="/images/img7.jpg"
                  alt="Loading..."
                />
              </div>
              <div className="grid-2">
                <img
                  className="image-item"
                  src="/images/img8.jpg"
                  alt="Loading..."
                />
                <img
                  className="image-item"
                  src="/images/img9.jpg"
                  alt="Loading..."
                />
              </div>
              <div className="grid-3">
                <img
                  className="image-item"
                  src="/images/img9.jpg"
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
                  src="/images/img9.jpg"
                  alt="Loading..."
                />
              </div>

              <div className="grid-2">
                <img
                  className="image-item"
                  src="/images/img8.jpg"
                  alt="Loading..."
                />
                <img
                  className="image-item"
                  src="/images/img9.jpg"
                  alt="Loading..."
                />
              </div>
              <div className="grid-1">
                <img
                  className="image-item"
                  src="/images/img5.jpg"
                  alt="Loading..."
                />
                <img
                  className="image-item"
                  src="/images/img6.jpg"
                  alt="Loading..."
                />
                <img
                  className="image-item"
                  src="/images/img7.jpg"
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
              <ItineraryPlanner userId={userId} formType={planModeType} />
            </div>
          ) : (
            <>
              <div className="leftcolumn">
                <div className="card quiz-section">
                  <h2>Discover Your Travel Style</h2>
                  <TravelStyleQuiz />
                </div>
                <div className="card">
                  {/* <h2>Trips that'll have you trippin</h2>
                  <h5>Some popular itineraries</h5>
                  <div className="fakeimg" style={{ height: "200px" }}>
                    Image
                  </div> */}
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
                {/* <div className="card">
                  <CurrencyConverter rates={rates} currencies={currencies} />
                </div> */}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Plan;
