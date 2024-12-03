import React from 'react';
import './ContactUs.css';
import { Modal, Button, Alert } from "react-bootstrap";

const ContactUs = () => {
  return (
    <div className="contact-us">
          <div className="contact-header">
            <div>
            <h1>Contact Us</h1>
            <p>
              Interested in working together? Fill out some info and we will be
              in touch shortly. We can’t wait to hear from you!
            </p>
            </div>
          </div>
          <div className="right-div contact-section">
          <form >
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                Name 
              </label>
              <div className="d-flex gap-3">
                <input
                  type="text"
                  id="firstName"
                  className="form-control"
                  placeholder="First Name"
                  required
                />
                <input
                  type="text"
                  id="lastName"
                  className="form-control"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email 
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message 
              </label>
              <textarea
                id="message"
                className="form-control"
                rows="4"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <Button type="submit" className="custom-get-started-btn" variant="outline-primary">
            Submit
          </Button>
          </form>
          </div>
    </div>
  );
};

export default ContactUs;
