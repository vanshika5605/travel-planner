import React from "react";
import "./Plan.css";
import CustomCalendar from "./CustomCalendar";
import CurrencyConverter from "./CurrencyConverter";
import TravelStyleQuiz from "./TravelStyleQuiz";

const Plan = () => {
  return (
    <div>
      {/* Take a Break Section */}
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
              Indulge in the freedom of exploration with our effortless booking
              platform.
            </p>
            <div className="button-group">
              <button className="cta-button">
                I already know my dream destination
              </button>
              <button className="cta-button">
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

      {/* Editor's Choice Section */}
      <section>
        {/* <h2>Editor's Choice</h2> */}
        <div class="row">
          <div class="leftcolumn">
            
            <div class="card">
            <h2>Discover Your Travel Style</h2>

              <TravelStyleQuiz></TravelStyleQuiz>
            </div>
            <div class="card">
              <h2>Trips that'll have you trippin</h2>
              <h5>Some popular itineraries</h5>
              <div class="fakeimg" style={{ height: "200px" }}>
                Image
              </div>
            </div>
          </div>
          <div class="rightcolumn">
            <div class="card">
              <CustomCalendar></CustomCalendar>
            </div>
            <div class="card">
              <CurrencyConverter></CurrencyConverter>
            </div>
            {/* <div class="card">
              <h3>Follow Me</h3>
              <p>Some text..</p>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plan;
