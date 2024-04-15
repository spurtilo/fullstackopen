import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    placeLike(state, action) {
      const { id } = action.payload;
      const updatedBlogs = state.map((blog) =>
        blog.id !== id ? blog : action.payload
      );
      return updatedBlogs.sort((a, b) => b.likes - a.likes);
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { setBlogs, appendBlog, placeLike, removeBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
    } catch (error) {
      console.error("Error initializing blogs:", error);
      dispatch(
        setNotification(
          error.response?.data?.error ||
            `Error initializing blogs: ${error.message}`,
          "error"
        )
      );
    }
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject);
      dispatch(appendBlog(newBlog));
    } catch (error) {
      console.error("Error adding a blog:", error);
      dispatch(
        setNotification(
          error.response?.data?.error ||
            `Error adding a blog: ${error.message}`,
          "error"
        )
      );
    }
  };
};

export const updateLikes = (id) => {
  return async (dispatch, getState) => {
    try {
      const blogToLike = getState().blogs.find((b) => b.id === id);
      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1,
      };
      await blogService.update(id, likedBlog);
      dispatch(placeLike(likedBlog));
    } catch (error) {
      console.error("Error updating likes:", error);
      dispatch(
        setNotification(
          error.response?.data?.error ||
            `Error updating likes: ${error.message}`,
          "error"
        )
      );
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    try {
      const blogToRemove = getState().blogs.find((b) => b.id === id);
      if (
        // eslint-disable-next-line no-alert
        !window.confirm(
          `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
        )
      ) {
        return;
      }
      await blogService.remove(blogToRemove.id);
      dispatch(removeBlog(blogToRemove.id));
    } catch (error) {
      console.error("Error deleting blog:", error);
      dispatch(
        setNotification(
          error.response?.data?.error ||
            `Error deleting blog: ${error.message}`,
          "error"
        )
      );
    }
  };
};

export default blogSlice.reducer;
