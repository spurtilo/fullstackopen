const RemoveBlogButton = ({ blogId, title, author, removeBlog }) => {
  const deleteBlog = () => {
    if (!window.confirm(`Remove blog ${title} by ${author}`)) return;
    removeBlog(blogId);
  };
  return <button onClick={deleteBlog}>Remove</button>;
};

export default RemoveBlogButton;
