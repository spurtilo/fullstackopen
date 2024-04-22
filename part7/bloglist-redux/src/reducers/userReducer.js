import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";
import blogService from "../services/blogs";
import userService from "../services/users";

import { setNotification } from "./notificationReducer";

const initialState = {
  isAuthenticated: !!localStorage.getItem("loggedBloglistUser"),
  userDetails: JSON.parse(localStorage.getItem("loggedBloglistUser")) || null,
  allUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      return { ...state, isAuthenticated: true, userDetails: action.payload };
    },
    logoutUser(state, action) {
      return { ...state, isAuthenticated: false, userDetails: null };
    },
    setUsers(state, action) {
      return { ...state, allUsers: action.payload };
    },
  },
});

export const { loginUser, logoutUser, setUsers } = userSlice.actions;

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

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
    blogService.setToken(null);
    dispatch(logoutUser());
  };
};

export default userSlice.reducer;
