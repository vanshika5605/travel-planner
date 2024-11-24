// src/pages/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const SignUp = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    degree: '',
    yearOfStudy: '',
    gender: '',
    major: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [errorMessage, setErrorMessage] = useState("");


  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Check password requirements when password field is updated
    if (id === "password") {
      setPasswordChecks({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value)
      });
    }
  };

  const handleDegreeChange = (e) => {
    const degree = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      degree,
      yearOfStudy: '',
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate form before sending (optional)
    if (!formData.email || !formData.password || formData.password !== formData.confirmPassword) {
      setErrorMessage('Please complete all fields correctly.');
      return;
    }

    try {
      // Sending signup data to the backend
      const response = await axios.post('http://localhost:5000/user/insert', formData);
      console.log(response)
      // Handle success response (status 201)
      if (response.status === 200) {
        console.log('Signup successful:', response.data);
        props.setUserId(formData.email)
        props.setIsLoggedIn(true)
        console.log("added")
        navigate("/")
        // Redirect to login or another page on successful signup
      }
    } catch (error) {
      // Handle error response based on status codes
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setErrorMessage('User already exists. Please try with a different email.');
            break;
          case 500:
            setErrorMessage('Internal server error. Please try again later.');
            break;
          default:
            setErrorMessage('An unknown error occurred.');
        }
      } else {
        setErrorMessage('Error: Could not connect to the server.');
      }
    }
  };

  const getYearOptions = () => {
    if (formData.degree === 'Bachelors') {
      return ['Fresher', 'Sophomore', 'Junior', 'Senior'];
    } else if (formData.degree === 'Masters') {
      return ['First Year', 'Second Year'];
    } else if (formData.degree === 'PhD') {
      return ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Fifth Year'];
    }
    return [];
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h2>Start Your Journey!</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {formErrors.name && <small className="text-danger">{formErrors.name}</small>}
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            value={formData.age}
            onChange={handleInputChange}
          />
          {formErrors.age && <small className="text-danger">{formErrors.age}</small>}
        </div>

        {/* Group Degree, Year of Study, and Major */}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="degree" className="form-label">Degree</label>
            <select
              className="form-control"
              id="degree"
              value={formData.degree}
              onChange={handleDegreeChange}
            >
              <option value="">Select Degree</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>
            {formErrors.degree && <small className="text-danger">{formErrors.degree}</small>}
          </div>
          {/* <div className="col">
            <label htmlFor="yearOfStudy" className="form-label">Year of Study</label>
            <select
              className="form-control"
              id="yearOfStudy"
              value={formData.yearOfStudy}
              onChange={handleInputChange}
            >
              <option value="">Select Year</option>
              {getYearOptions().map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </select>
            {formErrors.yearOfStudy && <small className="text-danger">{formErrors.yearOfStudy}</small>}
          </div> */}
          <div className="col">
            <label htmlFor="major" className="form-label">Major</label>
            <input
              type="text"
              className="form-control"
              id="major"
              value={formData.major}
              onChange={handleInputChange}
            />
            {formErrors.major && <small className="text-danger">{formErrors.major}</small>}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Gender</label>
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={() => setFormData({ ...formData, gender: 'Male' })}
            />
            <label htmlFor="male" className="ms-2 me-3">Male</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={() => setFormData({ ...formData, gender: 'Female' })}
            />
            <label htmlFor="female" className="ms-2 me-3">Female</label>
            <input
              type="radio"
              id="other"
              name="gender"
              value="Other"
              checked={formData.gender === 'Other'}
              onChange={() => setFormData({ ...formData, gender: 'Other' })}
            />
            <label htmlFor="other" className="ms-2">Other</label>
          </div>
          {formErrors.gender && <small className="text-danger">{formErrors.gender}</small>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            pattern="[0-9]{10}" // Optional pattern for phone validation (10 digits)
            placeholder="Enter 10-digit phone number"
          />
          {formErrors.phone && <small className="text-danger">{formErrors.phone}</small>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {formData.password != "" ? <>          {formErrors.password && <small className="text-danger">{formErrors.password}</small>}
            <ul className="password-requirements">
              <li className={passwordChecks.length ? "text-success" : "text-danger"}>
                {passwordChecks.length ? "✔" : "✘"} At least 8 characters
              </li>
              <li className={passwordChecks.uppercase ? "text-success" : "text-danger"}>
                {passwordChecks.uppercase ? "✔" : "✘"} At least one uppercase letter
              </li>
              <li className={passwordChecks.lowercase ? "text-success" : "text-danger"}>
                {passwordChecks.lowercase ? "✔" : "✘"} At least one lowercase letter
              </li>
              <li className={passwordChecks.specialChar ? "text-success" : "text-danger"}>
                {passwordChecks.specialChar ? "✔" : "✘"} At least one special character
              </li>
            </ul></> : <></>}
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          {formErrors.confirmPassword && <small className="text-danger">{formErrors.confirmPassword}</small>}
        </div>
        <button type="submit" className="btn btn-primary custom-filled-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
