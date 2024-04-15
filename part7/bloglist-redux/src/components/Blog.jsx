import { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes, { shape } from "prop-types";
import LikeCounter from "./LikeCounter";
import RemoveBlogButton from "./RemoveBlogButton";

const Blog = ({ blog }) => {
  const authUser = useSelector((state) => state.user.userDetails);

  const blogStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 10,
    marginBottom: 10,
    border: "solid",
    borderWidth: 1,
  };

  const [expanded, setExpanded] = useState(false);
  const buttonLabel = expanded ? "Hide" : "View";

  const showWhenExpanded = { display: expanded ? "" : "none" };

  const toggleExpanded = () => {
    setExpanded(!expanded);
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
        Likes: <LikeCounter blogId={blog.id} />
      </div>
      <div style={showWhenExpanded}>User: {blog.user.name}</div>
      {authUser.username === blog.user.username && (
        <div style={showWhenExpanded}>
          <RemoveBlogButton blogId={blog.id} />
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
