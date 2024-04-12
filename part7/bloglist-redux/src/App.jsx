import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import Heading from "./components/Heading";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, setBlogs, createBlog } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  // const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    try {
      dispatch(initializeBlogs());
    } catch (error) {
      dispatch(
        setNotification(
          error.response.data.error || "Error fetching blogs: " + error.message,
          "error"
        )
      );
    }
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (blogObject) => {
    try {
      dispatch(createBlog(blogObject));
      dispatch(
        setNotification(
          `A new blog added: ${blogObject.title} by ${blogObject.author}`,
          "success"
        )
      );
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      console.error("Error adding a blog:", error);
      dispatch(
        setNotification(
          error.response.data.error || "Error adding a blog: " + error.message,
          "error"
        )
      );
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      await blogService.remove(blogId);
      setBlogs((blogs) => blogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error);
      dispatch(
        setNotification(
          error.response.data.error || "Error deleting blog: " + error.message,
          "error"
        )
      );
    }
  };

  const updateLikes = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject);

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === id ? { ...blog, likes: blogObject.likes } : blog
        )
      );
      setBlogs((prevBlogs) => [...prevBlogs].sort((a, b) => b.likes - a.likes));
    } catch (error) {
      console.error("Error updating likes:", error);
      dispatch(
        setNotification(
          error.response.data.error || "Error updating likes: " + error.message,
          "error"
        )
      );
    }
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (error) {
      console.error("Login error:", error);
      dispatch(
        setNotification(
          error.response.data.error || "Login error: " + error.message,
          "error"
        )
      );
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBloglistUser");
    setUser(null);
  };

  const blogFormRef = useRef(null);

  return (
    <div>
      {!user && (
        <div>
          <Heading text="Log into application" headingType="h2" />
          <Notification />
          <LoginForm authenticateUser={handleLogin} />
        </div>
      )}
      {user && (
        <div>
          <Heading text="The Bloglist" headingType="h1" />
          <Notification />
          <p>{user.name} is logged in...</p>
          <Logout logoutHandler={handleLogout} />
          <Heading text="Add a New Blog" headingType="h2" />
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <br />
          <BlogList
            currentUser={user}
            removeBlog={deleteBlog}
            handleLikes={updateLikes}
          />
        </div>
      )}
    </div>
  );
};

export default App;
