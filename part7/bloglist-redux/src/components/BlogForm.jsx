import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const BlogForm = ({ toggleVisibility }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    dispatch(createBlog(blogObject));
    dispatch(
      setNotification(
        `A new blog added: ${blogObject.title} by ${blogObject.author}`,
        "success"
      )
    );
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
    toggleVisibility();
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              data-testid="titleInput"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="author">
            Author
            <input
              type="text"
              id="author"
              data-testid="authorInput"
              value={newAuthor}
              onChange={(event) => setNewAuthor(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="url">
            URL
            <input
              type="text"
              id="url"
              data-testid="urlInput"
              value={newUrl}
              onChange={(event) => setNewUrl(event.target.value)}
            />
          </label>
        </div>
        <button type="submit" data-testid="blogSubmitButton">
          Submit
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
};

export default BlogForm;
