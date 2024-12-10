import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backend from "../Utils/backend";

// SignUp component to let a new user sign up
const SignUp = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    role: "user",
    gender: "",
    defaultCurrency: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (id === "password") {
      setPasswordChecks({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.password ||
      formData.password !== formData.confirmPassword
    ) {
      setErrorMessage(
        "Please fill all fields correctly or ensure passwords match."
      );
      return;
    }

    try {
      const response = await backend.addUser(formData);
      if (response.status === 200) {
        props.setUserId(formData.email);
        props.setUserData(formData);
        props.setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setErrorMessage(
              "User already exists. Please try with a different email."
            );
            break;
          case 500:
            setErrorMessage("Internal server error. Please try again later.");
            break;
          default:
            setErrorMessage("An unknown error occurred.");
        }
      } else {
        setErrorMessage("Error: Could not connect to the server.");
      }
    }
  };

  // Dynamically generate input fields based on `formData` keys
  const renderInputFields = () => {
    return Object.keys(formData).map((key) => {
      if (key === "gender") {
        return (
          <div className="mb-3" key={key}>
            <label className="form-label">Gender</label>
            <div>
              {["Male", "Female", "Other"].map((gender) => (
                <div key={gender} className="form-check form-check-inline">
                  <input
                    type="radio"
                    id={gender}
                    name="gender"
                    className="form-check-input"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={() => setFormData({ ...formData, gender })}
                  />
                  <label htmlFor={gender} className="form-check-label">
                    {gender}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (key === "password" || key === "confirmPassword") {
        return (
          <div className="mb-3" key={key}>
            <label htmlFor={key} className="form-label">
              {key === "password" ? "Password" : "Confirm Password"}
            </label>
            <input
              type="password"
              className="form-control"
              id={key}
              value={formData[key]}
              onChange={handleInputChange}
            />
            {key === "password" && (
              <ul className="password-requirements">
                <li
                  className={
                    passwordChecks.length ? "text-success" : "text-danger"
                  }
                >
                  {passwordChecks.length ? "✔" : "✘"} At least 8 characters
                </li>
                <li
                  className={
                    passwordChecks.uppercase ? "text-success" : "text-danger"
                  }
                >
                  {passwordChecks.uppercase ? "✔" : "✘"} At least one uppercase
                  letter
                </li>
                <li
                  className={
                    passwordChecks.lowercase ? "text-success" : "text-danger"
                  }
                >
                  {passwordChecks.lowercase ? "✔" : "✘"} At least one lowercase
                  letter
                </li>
                <li
                  className={
                    passwordChecks.specialChar ? "text-success" : "text-danger"
                  }
                >
                  {passwordChecks.specialChar ? "✔" : "✘"} At least one special
                  character
                </li>
              </ul>
            )}
          </div>
        );
      }

      if (key === "role") {
        return;
      }

      return (
        <div className="mb-3" key={key}>
          <label htmlFor={key} className="form-label">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          <input
            type={key === "email" ? "email" : "text"}
            className="form-control"
            id={key}
            value={formData[key]}
            onChange={handleInputChange}
          />
        </div>
      );
    });
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2>Start Your Journey!</h2>
      {/* Display error message if it exists */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleRegister}>
        {renderInputFields()}
        <button type="submit" className="btn btn-primary custom-filled-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
