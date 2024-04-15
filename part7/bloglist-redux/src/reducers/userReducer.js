import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";
import blogService from "../services/blogs";

import { setNotification } from "./notificationReducer";

const initialState = {
  isAuthenticated: !!localStorage.getItem("loggedBloglistUser"),
  userDetails: JSON.parse(localStorage.getItem("loggedBloglistUser")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      return { isAuthenticated: true, userDetails: action.payload };
    },
    logoutUser(state, action) {
      return { isAuthenticated: false, userDetails: null };
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export const handleLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(loginUser(user));
    } catch (error) {
      dispatch(
        setNotification(
          error.response?.data?.error || `Login error: ${error.message}`,
          "error"
        )
      );
    }
  };
};

export const handleLogout = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBloglistUser");
    dispatch(logoutUser());
  };
};

export default userSlice.reducer;
