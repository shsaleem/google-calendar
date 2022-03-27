const calendarReducer = (state, action) => {
  if (action.type === "PUSH") {
    return [...state, action.payload];
  }

  if (action.type === "UPDATE") {
    return state.map((event) =>
      event.id === action.payload.id ? action.payload : event
    );
  }

  if (action.type === "DELETE") {
    return state.filter((event) => event.id !== action.payload.id);
  }

  throw new Error("No matching action type");
};

export default calendarReducer;
