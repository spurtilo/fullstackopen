import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { updateLikes } from "../reducers/blogReducer";

const LikeCounter = ({ blogId }) => {
  const blogToLike = useSelector((state) =>
    state.blogs.find((b) => b.id === blogId)
  );
  const dispatch = useDispatch();

  const addLike = () => {
    dispatch(updateLikes(blogToLike.id));
  };

  return (
    <>
      <span data-testid="likeCount">{blogToLike.likes}</span>{" "}
      <button type="button" data-testid="likeButton" onClick={addLike}>
        Like
      </button>
    </>
  );
};

LikeCounter.propTypes = {
  blogId: PropTypes.string.isRequired,
};

export default LikeCounter;
