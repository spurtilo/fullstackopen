import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null, type: "success" };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    hideNotification(state) {
      return { ...state, message: null };
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (message, type) => {
  return (dispatch) => {
    dispatch(showNotification({ message, type }));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;
