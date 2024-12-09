import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import backend from "../Utils/backend";
import "./CustomCalendar.css";

// Calendar component that calculates long weekends
const CustomCalendar = ({holidays, longWeekends}) => {

  const tileClassName = ({ date }) => {
    const dateStr = date.toDateString();
    const today = new Date();
    if (dateStr === today.toDateString()) {
      return "custom-today";
    }
    if (longWeekends.includes(new Date(dateStr).toISOString().split("T")[0])) {
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

  return (
    <div className="container">
      <h2 className="text-center">Holiday Calendar</h2>
      <Calendar
        tileClassName={tileClassName}
        tileContent={tileContent}
        className="border rounded"
      />
      <div className="mt-3">
        {/* <h5>Legend:</h5> */}
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
