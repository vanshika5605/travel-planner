// src/components/Loader.js
import React from 'react';
import './Loader.css';  // You can style the loader here

// Loader component displayed during transition of pages
const Loader = () => {
  return (
    <div data-testid="loader-container" className="loader-container">
      <img src="/loader.gif" alt="Loading..." />
    </div>
  );
};

export default Loader;
