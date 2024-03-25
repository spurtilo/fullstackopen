import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showVoteNotification(state, action) {
      return `You voted "${action.payload}"`;
    },
    showCreateNotification(state, action) {
      return `You created "${action.payload}"`;
    },
    hideNotification() {
      return null;
    },
  },
});

export const {
  showVoteNotification,
  showCreateNotification,
  hideNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
