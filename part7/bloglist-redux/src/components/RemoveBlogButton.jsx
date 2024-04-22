import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

import { deleteBlog } from "../reducers/blogReducer";

const RemoveButton = styled.button`
  white-space: nowrap;
  padding: 0.3rem 0.5rem;
  margin-top: 1rem;
  border: solid 1px #333333;
  border-radius: 0.3rem;
  background-color: #ffffff;
  color: #333333;
  box-shadow: 0 2px 4px #333333;
  transition: color 0.2s ease;
  font-weight: 600;
  &:hover {
    background: #333333;
    color: #ffffff;
    border: solid 1px #ffffff;
    cursor: pointer;
  }
`;

const RemoveBlogButton = ({ blogId }) => {
  const blogToRemove = useSelector((state) =>
    state.blogs.find((b) => b.id === blogId)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeBlog = () => {
    dispatch(deleteBlog(blogToRemove.id));
    navigate("/", { replace: true });
  };

  return (
    <RemoveButton type="button" data-testid="removeButton" onClick={removeBlog}>
      Remove Blog
    </RemoveButton>
  );
};

RemoveBlogButton.propTypes = {
  blogId: PropTypes.string.isRequired,
};

export default RemoveBlogButton;
