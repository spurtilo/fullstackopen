import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { updateLikes } from "../reducers/blogReducer";

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LikeButton = styled.button`
  white-space: nowrap;
  padding: 0.3rem 0.5rem;
  margin: 0;
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

const LikeCounter = ({ blogId }) => {
  const blogToLike = useSelector((state) =>
    state.blogs.find((b) => b.id === blogId)
  );
  const dispatch = useDispatch();

  const addLike = () => {
    dispatch(updateLikes(blogToLike.id));
  };

  return (
    <LikeContainer>
      <span data-testid="likeCount">{blogToLike.likes}</span>{" "}
      <LikeButton type="button" data-testid="likeButton" onClick={addLike}>
        Like
      </LikeButton>
    </LikeContainer>
  );
};

LikeCounter.propTypes = {
  blogId: PropTypes.string.isRequired,
};

export default LikeCounter;
