import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Heading from "./components/Heading";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";

import { initializeBlogs } from "./reducers/blogReducer";

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

  const blogFormRef = useRef(null);

  return (
    <div>
      {!isAuthenticated && (
        <div>
          <Heading text="Log into application" headingType="h2" />
          <Notification />
          <LoginForm />
        </div>
      )}
      {isAuthenticated && (
        <div>
          <Heading text="The Bloglist" headingType="h1" />
          <Notification />
          <p>{userDetails.name} is logged in...</p>
          <Logout />
          <Heading text="Add a New Blog" headingType="h2" />
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm
              toggleVisibility={() => blogFormRef.current.toggleVisibility()}
            />
          </Togglable>
          <br />
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
