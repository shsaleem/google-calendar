import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useCalendarContext } from "../context/CalendarContext";

const useStyles = makeStyles({
  day: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #e5e7eb",
  },

  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  event: {
    padding: "4px",
    marginBottom: "4px",
    color: "#fff",
    fontSize: "14px",
    overflow: "hidden",
    borderRadius: "4px",
    marginRight: "8px",
  },
  rows: {
    padding: "5px",
    margin: "5px 0",
    fontSize: "12px",
    textAlign: "center",
  },
  currentDate: {
    backgroundColor: "#2563eb",
    width: "24px",
    height: "24px",
    color: "#fff",
    borderRadius: "50%",
  },
});

const Day = ({ day, rowIdx }) => {
  const classes = useStyles();
  const [currentDateEvents, setCurrentDateEvents] = useState([]);
  const { setShowEventModal, setSelectedDay, savedEvents, setSelectedEvent } =
    useCalendarContext();

  useEffect(() => {
    const events = savedEvents.filter(
      (event) => dayjs(event.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );

    setCurrentDateEvents(events);
  }, [savedEvents, day]);

  return (
    <Box className={classes.day}>
      <header className={classes.header}>
        {rowIdx === 0 && (
          <Typography variant="p" fontSize="14px">
            {day.format("dddd").toUpperCase()}
          </Typography>
        )}
        <Typography
          variant="p"
          sx={{
            padding: "5px",
            margin: "5px 0",
            fontSize: "12px",
            textAlign: "center",
          }}
          className={`${
            day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
              ? `${classes.currentDate}`
              : ""
          }`}
        >
          {day.format("DD")}
        </Typography>
      </header>
      <Box
        sx={{
          flex: "1 1 0%",
          cursor: "pointer",
        }}
        onClick={() => {
          setShowEventModal(true);
          setSelectedDay(day);
        }}
      >
        {currentDateEvents.map((event, index) => {
          return (
            <Box
              className={classes.event}
              sx={{
                backgroundColor: `${event.color}`,
                opacity: 0.8,
              }}
              key={index}
              onClick={() => setSelectedEvent(event)}
            >
              {event.title} at {event.time}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Day;
