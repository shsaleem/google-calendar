import React, { useState } from "react";
import { CgCheck } from "react-icons/cg";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { useCalendarContext } from "../context/CalendarContext";

const colors = ["orange", "green", "blue", "red", "gray"];

const Modal = () => {
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
      <DialogTitle>Add Event</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <p>{selectedDay.format("dddd, MMMM DD")}</p>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            type="text"
            variant="standard"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <TextField
            sx={{ margin: "24px 0" }}
            autoFocus
            margin="dense"
            id="description"
            type="text"
            variant="standard"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              margin: "16px 0",
            }}
          >
            {colors.map((color, i) => (
              <span
                key={i}
                onClick={() => setSelectedColor(color)}
                style={{
                  backgroundColor: `${color}`,
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {selectedColor === color && (
                  <span style={{ color: "#fff" }}>
                    <CgCheck size={22} />
                  </span>
                )}
              </span>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" color="primary">
            {selectedEvent ? "Update" : "Add"}
          </Button>
          {selectedEvent ? (
            <Button onClick={deleteEvent} variant="contained" color="warning">
              Delete
            </Button>
          ) : (
            <Button onClick={() => setShowEventModal(false)}>Cancel</Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Modal;
