import React from "react";
import styled from "styled-components";

import Day from "./Day";

const Month = ({ month }) => {
  return (
    <Wrapper>
      {month.map((row, idx) => {
        return (
          <React.Fragment key={idx}>
            {row.map((day, i) => {
              return <Day key={i} day={day} rowIdx={idx} />;
            })}
          </React.Fragment>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  flex: 1 1 0%;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-template-rows: repeat(5, minmax(0, 1fr));
`;

export default Month;
