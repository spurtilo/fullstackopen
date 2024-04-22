import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Users from "./components/Users";
import NavBar from "./components/NavBar";
import UserInfo from "./components/UserInfo";
import BlogInfo from "./components/BlogInfo";

import blogService from "./services/blogs";
import { initializeBlogs } from "./reducers/blogReducer";

const AppContainer = styled.div`
  overflow-x: hidden;
  display: flex;
  min-height: 100%;
  margin: 0 1rem;
  padding: 0 3rem;
  background-color: #404040;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
`;

const App = () => {
  const { userDetails, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && userDetails && userDetails.token)
      blogService.setToken(userDetails.token);
  }, [isAuthenticated, userDetails]);

  return (
    <AppContainer>
      {isAuthenticated ? (
        <div>
          <NavBar />
          <Notification />
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/users" element={<Users />} />
            <Route path="users/:id" element={<UserInfo />} />
            <Route path="blogs/:id" element={<BlogInfo />} />
          </Routes>
        </div>
      ) : (
        <div>
          <Notification />
          <LoginForm />
        </div>
      )}
    </AppContainer>
  );
};

export default App;
