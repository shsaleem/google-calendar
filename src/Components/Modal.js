import React, { useState } from "react";
import { CgCheck } from "react-icons/cg";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import DescriptionIcon from "@mui/icons-material/Description";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";

import { useCalendarContext } from "../context/CalendarContext";

const colors = ["orange", "green", "blue", "red", "gray", "tomato", "seagreen"];

const useStyles = makeStyles({
  colors: {
    display: "flex",
    gap: "10px",
  },
  color: {
    marginTop: "10px",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    cursor: "pointer",
  },
});

const Modal = () => {
  const classes = useStyles();
  const {
    setShowEventModal,
    selectedDay,
    dispatch,
    selectedEvent,
    setSelectedEvent,
  } = useCalendarContext();
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [time, setTime] = useState(selectedEvent ? selectedEvent.time : "");
  const [selectedColor, setSelectedColor] = useState(
    selectedEvent
      ? colors.find((color) => color === selectedEvent.color)
      : colors[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      time,
      color: selectedColor,
      day: selectedDay.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    if (selectedEvent) {
      dispatch({ type: "UPDATE", payload: calendarEvent });
      setSelectedEvent(null);
    } else {
      dispatch({ type: "PUSH", payload: calendarEvent });
    }
    setShowEventModal(false);
  };

  const deleteEvent = () => {
    dispatch({ type: "DELETE", payload: selectedEvent });
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  return (
    <Dialog open={true} onClose={() => setShowEventModal(false)}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#F5F5F5",
        }}
      >
        <IconButton>
          <DragHandleIcon />
        </IconButton>
        <IconButton onClick={() => setShowEventModal(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2} direction="row" margin="20px 0">
            <IconButton>
              <EventNoteIcon />
            </IconButton>
            <TextField
              type="text"
              variant="standard"
              fullWidth
              placeholder="Add title and time"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Stack>
          <Stack spacing={2} direction="row" margin="20px 0">
            <IconButton>
              <AccessTimeIcon />
            </IconButton>
            <Typography variant="p">
              {selectedDay.format("dddd, MMMM DD")}
              <br />
              <small>Does not repeat</small>
            </Typography>
          </Stack>
          <Stack spacing={2} direction="row" margin="20px 0">
            <IconButton marginLeft="16px">
              <DescriptionIcon />
            </IconButton>
            <TextField
              sx={{ margin: "32px 0" }}
              type="text"
              placeholder="Add description"
              variant="standard"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
          <Stack spacing={2} direction="row" margin="20px 0">
            <IconButton>
              <CalendarTodayIcon />
            </IconButton>
            <TextField
              type="time"
              variant="standard"
              fullWidth
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Stack>
          <Stack spacing={2} direction="row" margin="20px 0">
            <IconButton>
              <PaletteIcon />
            </IconButton>
            <Box className={classes.colors}>
              {colors.map((color, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedColor(color)}
                  className={classes.color}
                  style={{
                    backgroundColor: `${color}`,
                  }}
                >
                  {selectedColor === color && (
                    <span>
                      <CgCheck size={22} color="#fff" />
                    </span>
                  )}
                </span>
              ))}
            </Box>
          </Stack>
          <Stack spacing={2} direction="row" margin="20px 0">
            <IconButton>
              <InsertInvitationIcon />
            </IconButton>
            <Typography variant="p">
              Shah Saleem
              <br />
              <small>Free . Default visibility . Do not notify</small>
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          {selectedEvent ? (
            <Button onClick={deleteEvent} variant="contained" color="warning">
              Delete
            </Button>
          ) : (
            <Button onClick={() => setShowEventModal(false)}>Cancel</Button>
          )}
          <Button type="submit" variant="contained" color="primary">
            {selectedEvent ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Modal;
