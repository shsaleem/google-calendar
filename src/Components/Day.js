import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";

import { useCalendarContext } from "../context/CalendarContext";

const Day = ({ day, rowIdx }) => {
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
    <Wrapper>
      <header>
        {rowIdx === 0 && (
          <Typography variant="p" className="first-row">
            {day.format("dddd").toUpperCase()}
          </Typography>
        )}
        <Typography
          variant="p"
          className={`rows ${
            day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
              ? "current-date"
              : ""
          }`}
        >
          {day.format("DD")}
        </Typography>
      </header>
      <Box
        style={{
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
              style={{
                padding: "4px",
                marginBottom: "4px",
                color: "#fff",
                fontSize: "14px",
                overflow: "hidden",
                borderRadius: "4px",
                backgroundColor: `${event.color}`,
                opacity: 0.6,
              }}
              key={index}
              className="event"
              onClick={() => setSelectedEvent(event)}
            >
              {event.title}
            </Box>
          );
        })}
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    .first-row {
      font-size: 14px;
    }
    .rows {
      padding: 5px;
      margin: 5px 0;
      font-size: 12px
      text-align: center;
    }
  }

  .current-date {
    background-color: #2563eb;
    width: 24px;
    height: 24px;
    color: #fff;
    border-radius: 50%;
  }

`;

export default Day;
