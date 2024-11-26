import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import backend from "../Utils/backend";
import "./CustomCalendar.css";

const CustomCalendar = () => {
  const [holidays, setHolidays] = useState([]);
  const [longWeekends, setLongWeekends] = useState([]);

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
        if (holidays.some((h) => new Date(h.date).toDateString() === nextMonday.toDateString())) {
          longWeekendDates.push(holidayDate.toDateString());
        }
      }

      if (dayOfWeek === 1) {
        const prevFriday = new Date(holidayDate);
        prevFriday.setDate(holidayDate.getDate() - 3);
        if (holidays.some((h) => new Date(h.date).toDateString() === prevFriday.toDateString())) {
          longWeekendDates.push(holidayDate.toDateString());
        }
      }
    });
    return longWeekendDates;
  };

  const tileClassName = ({ date }) => {
    const dateStr = date.toDateString();

    const today = new Date();
    if (dateStr === today.toDateString()) {
      return "custom-today";
    }

    if (longWeekends.includes(dateStr)) {
      return "long-weekend";
    }

    if (holidays.some((holiday) => new Date(holiday.date).toDateString() === dateStr)) {
      return "holiday";
    }

    if (date.getDay() === 0 || date.getDay() === 6) {
      return "weekend";
    }

    return "";
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const holiday = holidays.find(
        (holiday) => date.toDateString() === new Date(holiday.date).toDateString()
      );

      if (holiday) {
        return (
          <span title={holiday.name} className="fw-bold">
            *
          </span>
        );
      }

      return null;
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center">Holiday Calendar</h1>
      <Calendar
        tileClassName={tileClassName}
        tileContent={tileContent}
        className="border rounded"
      />
      <div className="mt-3">
        <h5>Legend:</h5>
        <ul className="list-unstyled">
          <li>
            <span className="legend-box long-weekend"></span> Long Weekend
          </li>
          <li>
            <span className="legend-box holiday"></span> Public Holiday 
          </li>
          <li>
            <span className="legend-box weekend"></span> Weekend
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomCalendar;
