import React, { useEffect, useState } from "react";
import backend from "../Utils/backend";
import "./Features.css";

// Feature component on the home page to display the list of features that our website offers
const Features = ({errorMessage, setErrorMessage}) => {
  const [features, setFeatures] = useState([]);

  const getFeatureList = async () => {
    setErrorMessage(null)
    try {
      const response = await backend.getFeaturesList();
      const updatedFeatures = response.data[0].features.map(
        (feature, index) => ({
          ...feature,
          id: index + 1, // Add an ID (index-based or any unique identifier logic)
        })
      );
      setFeatures(updatedFeatures);
    } catch (error) {
      console.log(error.response)
      if (error.response && error.response.status === 500) {
        setErrorMessage("Service unavailable. Please try again later.");
      } else {
        setErrorMessage("Error: Could not connect to the server");
      }
    }
  };

  useEffect(() => {
    getFeatureList();
  }, []);

  return (
    <>
    <div className="features">
      <div className="left-div">
        <h2>Our Services</h2>
      </div>
      <div className="right-div">
        <div
          className="accordion custom-accordion border-0"
          id="featuresAccordion"
        >
          {features.map((feature) => (
            <div
              className="accordion-item custom-accordion-item"
              key={feature.id}
            >
              <div className="custom-accordion-header">
                <h2
                  className="accordion-header"
                  id={`heading-${feature.id}`}
                  data-testid={`heading-${feature.id}`}
                >
                  <button
                    className="accordion-button collapsed d-flex justify-content-between align-items-center bg-white shadow-none custom-accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${feature.id}`}
                    aria-expanded="false"
                    aria-controls={`collapse-${feature.id}`}
                  >
                    <span>{feature.feature}</span>
                    <span className="toggle-icon"></span>
                  </button>
                </h2>
              </div>

              <div
                id={`collapse-${feature.id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading-${feature.id}`}
                data-bs-parent="#featuresAccordion"
                data-testid={`collapse-${feature.id}`}
              >
                <div className="accordion-body">{feature.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Features;
