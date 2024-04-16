import { useState, useEffect, useRef, useContext } from "react";

import Heading from "./components/Heading";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

import NotificationContext from "./contexts/NotificationContext";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const [notification, dispatch] = useContext(NotificationContext);

  const handleNotification = (message, msgType) => {
    dispatch({
      type: "notification/showNotification",
      payload: { message, msgType },
    });
    setTimeout(() => {
      dispatch({ type: "notification/hideNotification" });
    }, 3000);
  };

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const fetchedBlogs = await blogService.getAll();
        setBlogs(fetchedBlogs.sort((a, b) => b.likes - a.likes));
      } catch (error) {
        console.error("Error fetching blogs:", error);
        handleNotification(error.response.data.error, "error");
      }
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs((blogs) => blogs.concat(returnedBlog));

      handleNotification(
        `A new blog added: ${returnedBlog.title} by ${returnedBlog.author}`,
        "success"
      );
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      console.error("Error adding a blog:", error);
      handleNotification(error.response.data.error, "error");
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      await blogService.remove(blogId);
      setBlogs((blogs) => blogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error);
      handleNotification(error.response.data.error, "error");
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
      handleNotification(error.response.data.error, "error");
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
      handleNotification(error.response.data.error, "error");
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
          <Notification
            message={notification.message}
            type={notification.type}
          />
          <p>{user.name} is logged in...</p>
          <Logout logoutHandler={handleLogout} />
          <Heading text="Add a New Blog" headingType="h2" />
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <br />
          <BlogList
            blogs={blogs}
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
