import { useState, useEffect } from "react";
import Blog from "./Blog";
import blogService from "../services/blogs";

const BlogList = ({ blogs, currentUser }) => {
  const [updatedBlogs, setUpdatedBlogs] = useState(blogs);

  useEffect(() => {
    setUpdatedBlogs([...blogs]);
  }, [blogs]);

  const handleRemoveBlog = async (blogId) => {
    try {
      await blogService.remove(blogId);
      const updatedList = updatedBlogs.filter((blog) => blog.id !== blogId);
      setUpdatedBlogs(updatedList);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const sortedBlogs = [...updatedBlogs].sort((a, b) => b.likes - a.likes);

  return sortedBlogs.map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      currentUser={currentUser}
      removeBlog={handleRemoveBlog}
    />
  ));
};

export default BlogList;
