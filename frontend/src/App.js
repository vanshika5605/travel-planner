import './App.css';
import React, { useState, useEffect } from 'react';
// import Profile from './components/Profile';
// import Browse from './components/Browse';
import Navbar from './components/Navbar';
import Home from './components/Home';
// import SignUp from './components/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';  // Import the loader component
import Footer from './components/Footer';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // API call when userId changes
  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/user-details/${userId}`);
          const data = await response.json();
          setUserData(data); // Update userData with the response
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userId]); // Runs every time userId changes

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide the loader after 3 seconds (for example)
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Router>
        {!loading && (
          <Navbar
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            userId={userId}
            setUserId={setUserId}
            password={password}
            setPassword={setPassword}
            userData={userData}
          />
        )}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} userData={userData} mode="edit"/>} />
            <Route path="/browse" element={<Browse isLoggedIn={isLoggedIn} userId={userId}/>} />
            <Route path="/signup" element={<SignUp isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            userId={userId}
            setUserId={setUserId}/>} /> */}
          </Routes>
        </div>
        <div>
          <Footer></Footer>
        </div>
      </Router>
    </>
  );
};

export default App;
