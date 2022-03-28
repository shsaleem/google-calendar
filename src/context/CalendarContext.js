import React, { useContext, useReducer, useState, useEffect } from "react";
import dayjs from "dayjs";

import calendarReducer from "../reducer/CalendarReducer";

const CalendarContext = React.createContext();

const getLocalStorage = () => {
  let events = localStorage.getItem("savedEvents");
  if (events) {
    return (events = JSON.parse(localStorage.getItem("savedEvents")));
  } else {
    return [];
  }
};

const AppProvider = ({ children }) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [savedEvents, dispatch] = useReducer(
    calendarReducer,
    getLocalStorage()
  );

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  return (
    <CalendarContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        showEventModal,
        setShowEventModal,
        selectedDay,
        setSelectedDay,
        selectedEvent,
        savedEvents,
        dispatch,
        setSelectedEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  return useContext(CalendarContext);
};

export { AppProvider };
