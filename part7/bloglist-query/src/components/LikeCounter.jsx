import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import blogService from "../services/blogs";

import { useNotificationDispatch } from "../contexts/NotificationContext";

const LikeCounter = ({ blogToLike }) => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const likeMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      );
    },
    onError: (error) => {
      notificationDispatch(
        error.response?.data?.error || `Error updating likes: ${error.message}`,
        "error"
      );
    },
  });

  const handleLikes = ({ id, likes, ...props }) => {
    const newObject = {
      likes: likes + 1,
      ...props,
    };
    likeMutation.mutate({ id, newObject });
  };

  return (
    <>
      <span data-testid="likeCount">{blogToLike.likes}</span>{" "}
      <button
        type="button"
        data-testid="likeButton"
        onClick={() => handleLikes(blogToLike)}
      >
        Like
      </button>
    </>
  );
};

LikeCounter.propTypes = {
  blogToLike: PropTypes.shape({
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

export default LikeCounter;
