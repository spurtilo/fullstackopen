import { useState } from "react";
import LikeCounter from "./LikeCounter";
import RemoveBlogButton from "./RemoveBlogButton";

const Blog = ({ blog, currentUser, removeBlog, handleLikes }) => {
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
    <div style={blogStyle}>
      <div>
        {blog.title}
        {" - "}
        {blog.author} <button onClick={toggleExpanded}>{buttonLabel}</button>
      </div>
      <div style={showWhenExpanded}>
        URL: <a href={blog.url}>{blog.url}</a>
      </div>
      <div style={showWhenExpanded}>
        Likes: <LikeCounter blog={blog} handleLikes={handleLikes} />
      </div>
      <div style={showWhenExpanded}>User: {blog.user.name}</div>

      {currentUser.username === blog.user.username && (
        <div style={showWhenExpanded}>
          <RemoveBlogButton
            blogId={blog.id}
            title={blog.title}
            author={blog.author}
            removeBlog={removeBlog}
          />
        </div>
      )}
    </div>
  );
};

export default Blog;
