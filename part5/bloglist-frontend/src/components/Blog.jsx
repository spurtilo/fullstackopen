const Blog = ({ blog }) => (
  <div className="blogListItem">
    {blog.title} {blog.author}
  </div>
);

export default Blog;
