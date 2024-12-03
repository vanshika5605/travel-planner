import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h2>Your travel buddy</h2>
        {/* <p>
          Made with <a href="https://www.squarespace.com" target="_blank" rel="noopener noreferrer">Squarespace</a>
        </p> */}
      </div>
      <div className="footer-right">
        <div className="footer-section">
          <h3>Location</h3>
          {/* <p>123 Demo Street</p> */}
          <p>Amherst, MA - 01002</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p><a href="mailto:email@example.com">contact@travelbuddy.com</a></p>
          <p>(555) 555-5555</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
