import React, { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import backend from "../Utils/backend";
import "./Navbar.css";

const Navbar = ({
  isLoggedIn,
  setIsLoggedIn,
  userId,
  setUserId,
  password,
  setPassword,
  userData,
  setUserData,
  isAdmin,
  setIsAdmin,
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true); // for email validation
  const [touched, setTouched] = useState(false); // for tracking interaction
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLoginModalShow = () => setShowLoginModal(true);
  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    setUserId("");
    setPassword("");
    setIsEmailValid(true);
    setTouched(false);
    setErrorMessage("");
  };

  const handleEmailChange = (e) => {
    setUserId(e.target.value);
    setTouched(true);

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(e.target.value));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await backend.login({
        email: userId,
        password: password,
      });

      // Handle success response (status 200)
      if (response.status === 200) {
        setIsLoggedIn(true);
        setShowLoginModal(false);
        if (userId === "admin@umass.edu" && password === "Test@123") {
          navigate("/admin");
          setUserData(response.data.data); // Redirect to Admin Page
          setIsAdmin(true);
        } else {
          navigate("/");
          setUserData(response.data.data);
        }
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setErrorMessage("Invalid credentials. Please check your password.");
            break;
          case 404:
            setErrorMessage("User not found. Please check your email.");
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

  const handleLogout = () => {
    setShowLoginModal(false);
    setIsLoggedIn(false);
    setUserId("");
    setPassword("");
    setIsEmailValid(true);
    setTouched(false);
    navigate("/");
    setErrorMessage("");
  };

  // useEffect(() => {
  //   console.log("Changed")
  // },[isAdmin])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container custom-nav">
        <Link className="navbar-brand" to="/">
          {/* <img className="logo-class" src="/logo.jpg" alt="Loading..." /> */}
          <img className="logo-img" src="/images/logo.jpeg" alt="Logo"></img>
          <span className="main-app-name">Travel Planner </span>
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isLoggedIn ? (
              isAdmin ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link custom-nav-link" to="/admin">
                      Dashboard
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className=" nav-link custom-nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link custom-nav-link" to="/plan">
                      Plan a Trip
                    </Link>
                  </li>
                </>
              )
            ) : (
              <></>
            )}
          </ul>
          {!isLoggedIn ? (
            <div className="d-flex">
              <Button
                className="custom-btn"
                variant="outline-primary"
                onClick={handleLoginModalShow}
              >
                Login
              </Button>
              <Link
                to="/signup"
                className="btn btn-primary ms-2 custom-filled-btn"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <>
              <span className="custom-nav-link welcome-msg">
                Welcome <strong>{userData.name}</strong>
              </span>
              <Button
                className="custom-btn"
                variant="outline-primary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={handleLoginModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage != "" ? (
            <>
              <Alert variant="danger">{errorMessage}</Alert>
            </>
          ) : (
            <></>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className={`form-control ${
                  !isEmailValid && touched ? "is-invalid" : ""
                }`}
                id="email"
                onChange={handleEmailChange}
                value={userId}
                required
              />
              {!isEmailValid && touched && (
                <div className="invalid-feedback">
                  Please enter a valid email.
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <Button
              className="custom-filled-btn"
              variant="primary"
              type="submit"
              disabled={!isEmailValid || !password}
            >
              Log In
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </nav>
  );
};

export default Navbar;
