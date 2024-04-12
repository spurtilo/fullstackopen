import { useSelector } from "react-redux";

import Blog from "./Blog";

const BlogList = ({ currentUser, removeBlog, handleLikes }) => {
  const blogs = useSelector((state) => state.blogs);
  console.log("BLOGS BEFORE MAP: ", blogs);
  return blogs.map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      currentUser={currentUser}
      removeBlog={removeBlog}
      handleLikes={handleLikes}
    />
  ));
};

export default BlogList;
