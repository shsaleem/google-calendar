import React from "react";
import dayjs from "dayjs";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AppsIcon from "@mui/icons-material/Apps";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";

import icon from "../assests/plus.svg";
import { useCalendarContext } from "../context/CalendarContext";

const Navbar = () => {
  const { monthIndex, setMonthIndex, setShowEventModal } = useCalendarContext();

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  return (
    <AppBar position="static" color="transparent" sx={{ boxShadow: "none" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="row">
          <IconButton>
            <img
              style={{ width: "40px", height: "40px" }}
              src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_27_2x.png"
              alt="calendar"
            />
            Calendar
          </IconButton>

          <Button
            style={{
              margin: "0 16px",
              border: "1px solid #ddd",
              color: "black",
            }}
            variant="outlined"
            onClick={() => setMonthIndex(dayjs().month())}
          >
            Today
          </Button>
          <Button onClick={() => setShowEventModal(true)}>
            <img src={icon} alt="add icon" />
          </Button>
          <IconButton onClick={handlePrevMonth}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={handleNextMonth}>
            <ChevronRightIcon />
          </IconButton>
          <Typography
            variant="h6"
            style={{ display: "flex", alignItems: "center" }}
          >
            {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconButton style={{ margin: "0 10px" }}>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
          <IconButton style={{ margin: "0 10px" }}>
            <AppsIcon />
          </IconButton>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
