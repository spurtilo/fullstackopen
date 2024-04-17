import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import blogService from "../services/blogs";

import { useNotificationDispatch } from "../contexts/NotificationContext";

const BlogForm = ({ toggleVisibility }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const newblogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
      notificationDispatch(
        `A new blog added: ${newBlog.title} by ${newBlog.author}`,
        "success"
      );
      toggleVisibility();
    },
    onError: (error) => {
      notificationDispatch(
        error.response?.data?.error || `Error adding a blog: ${error.message}`,
        "error"
      );
    },
  });

  const addBlog = (event) => {
    event.preventDefault();
    newblogMutation.mutate({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="Title">
            Title
            <input
              type="text"
              value={newTitle}
              name="Title"
              data-testid="titleInput"
              onChange={(event) => setNewTitle(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="Author">
            Author
            <input
              type="text"
              value={newAuthor}
              name="Author"
              data-testid="authorInput"
              onChange={(event) => setNewAuthor(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="URL">
            URL
            <input
              type="text"
              value={newUrl}
              name="URL"
              data-testid="urlInput"
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

export default BlogForm;
