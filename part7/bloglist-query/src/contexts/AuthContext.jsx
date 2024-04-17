import { createContext, useMemo, useReducer, useContext } from "react";

import loginService from "../services/login";
import blogService from "../services/blogs";

import { useNotificationDispatch } from "./NotificationContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case "auth/loginUser":
      return { isAuthenticated: true, userDetails: action.payload };
    case "auth/logoutUser":
      return { isAuthenticated: false, userDetails: null };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, authDispatch] = useReducer(authReducer, {
    isAuthenticated: !!localStorage.getItem("loggedBloglistUser"),
    userDetails: JSON.parse(localStorage.getItem("loggedBloglistUser")) || null,
  });

  const memoizedContextValue = useMemo(
    () => [auth, authDispatch],
    [auth, authDispatch]
  );

  return (
    <AuthContext.Provider value={memoizedContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthState = () => {
  const authAndDispatch = useContext(AuthContext);
  return authAndDispatch[0];
};

export const useAuthDispatch = () => {
  const authAndDispatch = useContext(AuthContext);
  return authAndDispatch[1];
};

export const useLogin = () => {
  const notificationDispatch = useNotificationDispatch();
  const dispatch = useAuthDispatch();
  return async (username, password) => {
    try {
      const user = await loginService.login(username, password);
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch({ type: "auth/loginUser", payload: user });
    } catch (error) {
      notificationDispatch(
        error.response?.data?.error || `Login error: ${error.message}`,
        "error"
      );
    }
  };
};

export const useLogout = () => {
  const dispatch = useAuthDispatch();
  return () => {
    window.localStorage.removeItem("loggedBloglistUser");
    blogService.setToken(null);
    dispatch({ type: "auth/logoutUser" });
  };
};

export default AuthContext;
