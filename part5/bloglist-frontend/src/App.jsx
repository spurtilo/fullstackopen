import { useState, useEffect } from "react";

import Heading from "./components/Heading";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({
    message: null,
    type: "success",
  });

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
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

  const handleNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 3000);
  };

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const newBlog = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      };
      const returnedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedBlog));
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
      handleNotification(
        `A new blog added: ${returnedBlog.title} by ${returnedBlog.author}`,
        "success"
      );
    } catch (error) {
      console.error("Error adding a blog:", error);
      handleNotification(error.response.data.error, "error");
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
      handleNotification(error.response.data.error, "error");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBloglistUser");
    setUser(null);
  };

  return (
    <div>
      {!user && (
        <div>
          <Heading text="Log in to application" headingType="h2" />
          <Notification
            message={notification.message}
            type={notification.type}
          />
          <LoginForm
            usernameValue={username}
            passwordValue={password}
            usernameHandler={handleUsernameChange}
            passwordHandler={handlePasswordChange}
            loginHandler={handleLogin}
          />
        </div>
      )}
      {user && (
        <div>
          <Heading text="The Bloglist" headingType="h1" />
          <Notification
            message={notification.message}
            type={notification.type}
          />
          {user.name} is logged in...
          <Logout logoutHandler={handleLogout} />
          <Heading text="Create a New Blog" headingType="h2" />
          <BlogForm
            titleValue={newTitle}
            authorValue={newAuthor}
            urlValue={newUrl}
            titleHandler={handleTitleChange}
            authorHandler={handleAuthorChange}
            urlHandler={handleUrlChange}
            submitHandler={addBlog}
          />
          <br />
          <BlogList blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
