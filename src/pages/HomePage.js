import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";

import getMonth from "../utils";
import Navbar from "../Components/Navbar";
import Month from "../Components/Month";
import { useCalendarContext } from "../context/CalendarContext";
import Modal from "../Components/Modal";

const useStyles = makeStyles({
  home: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },

  month: {
    display: "flex",
    flex: "1",
  },
});

const HomePage = () => {
  const classes = useStyles();
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useCalendarContext();

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      {showEventModal && <Modal />}
      <div className={classes.home}>
        <Navbar />
        <div className={classes.month}>
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
