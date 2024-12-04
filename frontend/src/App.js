import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import AdminPage from "./components/AdminPage/AdminPage";
import Home from "./components/Home/Home";
import Plan from "./components/ItineraryPlanner/Plan";
import PackingList from "./components/PackingList/PackingList";
import Profile from "./components/Profile/Profile";
import SignUp from "./components/SignUp/SignUp";
import backend from "./components/Utils/backend";
import Footer from "./components/Utils/Footer";
import Loader from "./components/Utils/Loader"; // Import the loader component
import Navbar from "./components/Utils/Navbar";
// import { useNavigate } from "react-router-dom";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [holidays, setHolidays] = useState([]);
  const [longWeekends, setLongWeekends] = useState([]);
  const [rates, setRates] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchHolidays = async () => {
    try {
      const response = await backend.getHolidays();
      setHolidays(response.data);

      // Determine long weekends
      const longWeekendDates = getLongWeekends(response.data);
      setLongWeekends(longWeekendDates);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const getLongWeekends = (holidays) => {
    const longWeekendDates = [];
    holidays.forEach((holiday) => {
      const holidayDate = new Date(holiday.date);
      const dayOfWeek = holidayDate.getDay();

      if (dayOfWeek === 5) {
        const nextMonday = new Date(holidayDate);
        nextMonday.setDate(holidayDate.getDate() + 3);
        if (
          holidays.some(
            (h) => new Date(h.date).toDateString() === nextMonday.toDateString()
          )
        ) {
          longWeekendDates.push(holidayDate.toDateString());
        }
      }

      if (dayOfWeek === 1) {
        const prevFriday = new Date(holidayDate);
        prevFriday.setDate(holidayDate.getDate() - 3);
        if (
          holidays.some(
            (h) => new Date(h.date).toDateString() === prevFriday.toDateString()
          )
        ) {
          longWeekendDates.push(holidayDate.toDateString());
        }
      }
    });
    return longWeekendDates;
  };

  const fetchExchangeRates = async () => {
    try {
      const response = await backend.getExchangeRates();
      setRates(response.data.rates);
      const currencyOptions = Object.keys(response.data.rates).map(
        (currency) => ({
          value: currency,
          label: currency,
        })
      );
      setCurrencies(currencyOptions);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

  // useEffect(() => {
  //   navigate("/"); // Redirect to home route on refresh
  // }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide the loader after 3 seconds (for example)
    }, 3000);
    fetchExchangeRates();
    fetchHolidays();
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
            setUserData={setUserData}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
          />
        )}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signup"
              element={
                <SignUp
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  userId={userId}
                  setUserId={setUserId}
                  setUserData={setUserData}
                />
              }
            />
            {isLoggedIn ? (
              !isAdmin ? (
                <>
                  <Route
                    path="/profile"
                    element={<Profile userData={userData} />}
                  />
                  <Route
                    path="/plan"
                    element={
                      <Plan
                        isLoggedIn={isLoggedIn}
                        userId={userId}
                        holidays={holidays}
                        longWeekends={longWeekends}
                        rates={rates}
                        currencies={currencies}
                      />
                    }
                  />
                  <Route
                    path="/packing-list/:tripId"
                    element={<PackingList />}
                  />
                </>
              ) : (
                <>
                  <Route
                    path="/admin"
                    element={<AdminPage setIsAdmin={setIsAdmin} />}
                  />
                </>
              )
            ) : (
              <></>
            )}
            <Route path="*" element={<Navigate to="/" />} />{" "}
            {/* Redirects all undefined routes */}
          </Routes>
        </div>
          <Footer></Footer>
      </Router>
    </>
  );
};

export default App;
