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
import Itinerary from "./components/ItineraryPlanner/Itinerary";
import PackingList from "./components/PackingList/PackingList";
import Profile from "./components/Profile/Profile";
import SignUp from "./components/SignUp/SignUp";
import backend from "./components/Utils/backend";
import Footer from "./components/Utils/Footer";
import Loader from "./components/Utils/Loader"; // Import the loader component
import Navbar from "./components/Utils/Navbar";
// import { useNavigate } from "react-router-dom";

// Main App component
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
      const response1 = await backend.getHolidays('2024');
      const response2 = await backend.getHolidays('2025');
      const response = [...response1.data, ...response2.data]
      setHolidays(response);
      // Determine long weekends
      const longWeekendDates = findLongWeekends(response);
      setLongWeekends(longWeekendDates);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const findLongWeekends = (holidays) => {
    // Convert holiday dates to a Set for quick lookup, maintaining UTC format
    const holidayDates = new Set(holidays.map(holiday => holiday.date));

    // Helper function to check if a date (in UTC) is a holiday
    const isHoliday = (date) => {
        const isoDate = date.toISOString().split("T")[0]; // Ensure UTC format
        return holidayDates.has(isoDate);
    };

    // Calculate long weekends
    const longWeekendDates = holidays.reduce((longWeekends, holiday) => {
        const holidayDate = new Date(holiday.date); // Parse the date as UTC
        const dayOfWeek = holidayDate.getUTCDay(); // Get the day of the week in UTC

        if (dayOfWeek === 5) { // Friday
            const saturday = new Date(holidayDate);
            saturday.setUTCDate(holidayDate.getUTCDate() + 1); // Add one day
            const sunday = new Date(holidayDate);
            sunday.setUTCDate(holidayDate.getUTCDate() + 2); // Add two days
            if (!isHoliday(saturday) && !isHoliday(sunday)) {
                longWeekends.push(holiday.date); // Friday
                longWeekends.push(saturday.toISOString().split("T")[0]); // Saturday
                longWeekends.push(sunday.toISOString().split("T")[0]); // Sunday
            }
        } else if (dayOfWeek === 1) { // Monday
            const sunday = new Date(holidayDate);
            sunday.setUTCDate(holidayDate.getUTCDate() - 1); // Subtract one day
            const saturday = new Date(holidayDate);
            saturday.setUTCDate(holidayDate.getUTCDate() - 2); // Subtract two days
            if (!isHoliday(sunday) && !isHoliday(saturday)) {
                longWeekends.push(saturday.toISOString().split("T")[0]); // Saturday
                longWeekends.push(sunday.toISOString().split("T")[0]); // Sunday
                longWeekends.push(holiday.date); // Monday
            }
        }

        return longWeekends;
    }, []);

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
                  <Route
                    path="/itinerary"
                    element={<Itinerary/>}
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
