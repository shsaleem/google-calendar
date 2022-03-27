import React, { useState, useEffect } from "react";
import styled from "styled-components";

import getMonth from "../utils";
import Navbar from "../Components/Navbar";
import Month from "../Components/Month";
import { useCalendarContext } from "../context/CalendarContext";
import Modal from "../Components/Modal";

const HomePage = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useCalendarContext();

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      {showEventModal && <Modal />}
      <Wrapper>
        <Navbar />
        <div className="month">
          <Month month={currentMonth} />
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
  .month {
      display: flex;
      flex: 1 1 0%;
    }
  }
`;

export default HomePage;
