import React, { useState } from 'react';
import './Features.css';

const Features = () => {
  const [features, setFeatures] = useState([
    { id: 1, title: 'Feature 1', content: 'Description of Feature 1' },
    { id: 2, title: 'Feature 2', content: 'Description of Feature 2' },
    { id: 3, title: 'Feature 3', content: 'Description of Feature 3' },
  ]);

  return (
    <div className="features">
      <div className="left-div">
        <h1>Our Services</h1>
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
                >
                  <button
                    className="accordion-button collapsed d-flex justify-content-between align-items-center bg-white shadow-none custom-accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${feature.id}`}
                    aria-expanded="false"
                    aria-controls={`collapse-${feature.id}`}
                  >
                    <span>{feature.title}</span>
                    <span className="toggle-icon"></span>
                  </button>
                </h2>
              </div>

              <div
                id={`collapse-${feature.id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading-${feature.id}`}
                data-bs-parent="#featuresAccordion"
              >
                <div className="accordion-body">{feature.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
