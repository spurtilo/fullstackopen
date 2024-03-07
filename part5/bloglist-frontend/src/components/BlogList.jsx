import Blog from "./Blog";

const blogList = ({ blogs }) =>
  blogs.map((blog) => <Blog key={blog.id} blog={blog} />);

export default blogList;
