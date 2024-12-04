import React from "react";
import { Button } from "react-bootstrap";
import "./ContactUs.css";

const ContactUs = () => {

    const handleGetInTouch = () => {
      const email = "example@example.com";
      const subject = "Inquiry";
      const body = "Hi, I want to get in touch.";
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

  return (
    <div className="contact-us">
      <div className="contact-header">
          <h2>Contact Us</h2>
          <p>
            Interested in working together? Fill out some info and we will be in
            touch shortly. We can’t wait to hear from you!
          </p>
      </div>
      <div className="right-div contact-section">
        <form>
          <div className="mb-3">
            {/* <label htmlFor="firstName" className="form-label">
              Name
            </label> */}
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
            {/* <label htmlFor="email" className="form-label">
              Email
            </label> */}
            <input
              type="email"
              id="email1"
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            {/* <label htmlFor="message" className="form-label">
              Message
            </label> */}
            <textarea
              id="message"
              className="form-control"
              rows="4"
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <Button
            type="submit"
            className="custom-get-started-btn contact-us-btn"
            variant="outline-primary"
            onClick={handleGetInTouch}
          >
            Get in touch
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
