import { useState } from "react";
import PropTypes from "prop-types";
import LikeCounter from "./LikeCounter";
import RemoveBlogButton from "./RemoveBlogButton";

import { useAuthState } from "../contexts/AuthContext";

const Blog = ({ blog }) => {
  const { userDetails } = useAuthState();

  const [expanded, setExpanded] = useState(false);
  const buttonLabel = expanded ? "Hide" : "View";
  const showWhenExpanded = { display: expanded ? "" : "none" };
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const blogStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 10,
    marginBottom: 10,
    border: "solid",
    borderWidth: 1,
  };

  return (
    <div style={blogStyle} data-testid={blog.title}>
      <div data-testid="blogItemTitle">
        {blog.title}
        {" - "}
        {blog.author}{" "}
        <button
          type="button"
          data-testid="viewHideButton"
          onClick={toggleExpanded}
        >
          {buttonLabel}
        </button>
      </div>

      <div style={showWhenExpanded}>
        URL: <a href={blog.url}>{blog.url}</a>
      </div>
      <div style={showWhenExpanded}>
        Likes: <LikeCounter blogToLike={blog} />
      </div>
      <div style={showWhenExpanded}>User: {blog.user.name}</div>
      {userDetails.username === blog.user.username && (
        <div style={showWhenExpanded}>
          <RemoveBlogButton
            blogId={blog.id}
            title={blog.title}
            author={blog.author}
          />
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
    likes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;
