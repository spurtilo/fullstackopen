import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import blogService from "../services/blogs";

import { useNotificationDispatch } from "../contexts/NotificationContext";

const RemoveBlogButton = ({ blogId, title, author }) => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((blog) => blog.id !== blogId)
      );
    },
    onError: (error) => {
      notificationDispatch(
        error.response?.data?.error || `Error deleting blog: ${error.message}`,
        "error"
      );
    },
  });

  const deleteBlog = () => {
    // eslint-disable-next-line no-alert
    if (!window.confirm(`Remove blog ${title} by ${author}`)) return;
    deleteBlogMutation.mutate(blogId);
  };

  return (
    <button type="button" data-testid="removeButton" onClick={deleteBlog}>
      Remove
    </button>
  );
};

RemoveBlogButton.propTypes = {
  blogId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default RemoveBlogButton;
