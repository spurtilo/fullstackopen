import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import blogService from "./services/blogs";
import { useAuthState } from "./contexts/AuthContext";

import Heading from "./components/Heading";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Togglable from "./components/Togglable";

const App = () => {
  const blogFormRef = useRef(null);
  const { isAuthenticated, userDetails } = useAuthState();

  useEffect(() => {
    if (isAuthenticated && userDetails && userDetails.token)
      blogService.setToken(userDetails.token);
  }, [isAuthenticated, userDetails]);

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    retry: 1,
  });

  if (result.isPending) {
    return <div>Loading page...</div>;
  }

  if (result.isError) {
    console.error("Error initializing blogs:", result.error);
    return (
      <div>
        {result.error.response?.data?.error ||
          `Error initializing blogs: ${result.error.message}`}
      </div>
    );
  }

  const blogs = result.data.sort((a, b) => b.likes - a.likes);

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
          <BlogList blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
