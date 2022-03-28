import React from "react";
import { makeStyles } from "@mui/styles";

import Day from "./Day";

const useStyles = makeStyles({
  month: {
    display: "grid",
    flex: "1",
    gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    gridTemplateRows: "repeat(5, minmax(0, 1fr))",
  },
});

const Month = ({ month }) => {
  const classes = useStyles();
  return (
    <main className={classes.month}>
      {month.map((row, idx) => {
        return (
          <React.Fragment key={idx}>
            {row.map((day, i) => {
              return <Day key={i} day={day} rowIdx={idx} />;
            })}
          </React.Fragment>
        );
      })}
    </main>
  );
};

export default Month;
