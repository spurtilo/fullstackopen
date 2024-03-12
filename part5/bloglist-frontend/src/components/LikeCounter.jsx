import { useState } from "react";
import blogService from "../services/blogs";

const LikeCounter = ({ id, user, likes, ...props }) => {
  const [updatedLikes, setUpdatedLikes] = useState(likes);

  const addLike = async () => {
    setUpdatedLikes((prevCount) => prevCount + 1);
    const blogToUpdate = {
      user: user.id,
      likes: updatedLikes + 1,
      ...props,
    };
    try {
      await blogService.update(id, blogToUpdate);
    } catch (error) {
      console.error("Error updating likes:", error);
      setUpdatedLikes((prevCount) => prevCount - 1);
    }
  };

  return (
    <>
      {updatedLikes} <button onClick={addLike}>Like</button>
    </>
  );
};

export default LikeCounter;
