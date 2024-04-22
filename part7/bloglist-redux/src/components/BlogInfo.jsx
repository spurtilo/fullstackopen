import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { commentBlog } from "../reducers/blogReducer";

import Heading from "./Heading";
import LikeCounter from "./LikeCounter";
import RemoveBlogButton from "./RemoveBlogButton";

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 44.5rem;
`;
const BlogRow = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;
const BlogCell1 = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 7%;
  padding: 0.6rem;
  padding-left: 0;
`;
const BlogCell2 = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 85%;
  padding: 10px;
`;

const CommentForm = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 1.5em;
`;
const CommentInput = styled.input`
  flex: 1;
  max-width: 30em;
`;
const SubmitButton = styled.button`
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

const CommentList = styled.ul`
  margin: 0;
  padding-left: 1.5em;
`;

const BlogInfo = () => {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user.userDetails);
  const blogs = useSelector((state) => state.blogs);
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  const addComment = (event) => {
    event.preventDefault();
    const commentObject = {
      text: newComment,
    };
    dispatch(commentBlog(blog.id, commentObject));
    setNewComment("");
  };

  if (!blog) {
    return null;
  }
  return (
    <BlogContainer>
      <Heading text={blog.title} headingType="h2" />
      <BlogRow>
        <BlogCell1>Author:</BlogCell1>
        <BlogCell2>{blog.author}</BlogCell2>
      </BlogRow>
      <BlogRow>
        <BlogCell1>URL:</BlogCell1>
        <BlogCell2>
          {" "}
          <a id="url" href={blog.url}>
            {blog.url}
          </a>
        </BlogCell2>
      </BlogRow>
      <BlogRow>
        <BlogCell1>Likes:</BlogCell1>
        <BlogCell2>
          <LikeCounter blogId={blog.id} />
        </BlogCell2>
      </BlogRow>
      <BlogRow>Added by {blog.user.name}</BlogRow>
      {authUser.username === blog.user.username && (
        <BlogRow>
          <RemoveBlogButton blogId={blog.id} />
        </BlogRow>
      )}
      <Heading text="Comments" headingType="h2" />
      <CommentForm onSubmit={addComment}>
        <CommentInput
          type="text"
          data-testid="titleInput"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </CommentForm>
      {blog.comments && blog.comments.length > 0 ? (
        <CommentList>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </CommentList>
      ) : (
        <BlogRow>No comments to display</BlogRow>
      )}
    </BlogContainer>
  );
};

export default BlogInfo;
