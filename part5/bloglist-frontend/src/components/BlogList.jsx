import Blog from "./Blog";

const BlogList = ({ blogs, currentUser, removeBlog, handleLikes }) => {
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
