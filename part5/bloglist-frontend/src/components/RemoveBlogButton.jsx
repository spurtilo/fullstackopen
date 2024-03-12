const RemoveBlogButton = ({ blogId, removeBlog }) => {
  const deleteBlog = () => {
    removeBlog(blogId);
  };
  return <button onClick={deleteBlog}>Remove</button>;
};

export default RemoveBlogButton;
