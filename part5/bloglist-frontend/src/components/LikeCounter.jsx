const LikeCounter = ({ blog: { id, user, likes, ...props }, handleLikes }) => {
  const addLike = () => {
    const blogToUpdate = {
      user: user.id,
      likes: likes + 1,
      ...props,
    };
    handleLikes(id, blogToUpdate);
  };
  return (
    <>
      {likes} <button onClick={addLike}>Like</button>
    </>
  );
};

export default LikeCounter;
