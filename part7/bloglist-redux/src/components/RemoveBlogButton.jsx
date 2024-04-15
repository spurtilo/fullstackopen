import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { deleteBlog } from "../reducers/blogReducer";

const RemoveBlogButton = ({ blogId }) => {
  const blogToRemove = useSelector((state) =>
    state.blogs.find((b) => b.id === blogId)
  );
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      data-testid="removeButton"
      onClick={() => {
        dispatch(deleteBlog(blogToRemove.id));
      }}
    >
      Remove
    </button>
  );
};

RemoveBlogButton.propTypes = {
  blogId: PropTypes.string.isRequired,
};

export default RemoveBlogButton;
