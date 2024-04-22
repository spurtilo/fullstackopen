import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const BlogFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 30rem;
`;

const BlogFormRow = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;
const Cell1 = styled.div`
  flex: 1;
  text-align: start;
  padding: 0;
`;
const Cell2 = styled.div`
  display: flex;
  flex: 7;
  justify-content: flex-start;
  padding: 0.5rem;
  padding-left: 0;
`;

const InputLabel = styled.label`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 0;
  margin: 0;
`;

const BlogInput = styled.input`
  min-width: 95%;
  height: 1.5rem;
  margin: 0;
  padding: 0;
  margin-left: 0.5rem;
  border-radius: 0.3rem;
  box-shadow: 0 2px 4px #333333;
`;

const SubmitBlogButton = styled.button`
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

const BlogForm = ({ toggleVisibility }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    dispatch(createBlog(blogObject));
    dispatch(
      setNotification(
        `A new blog added: ${blogObject.title} by ${blogObject.author}`,
        "success"
      )
    );
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
    toggleVisibility();
  };

  return (
    <BlogFormContainer onSubmit={addBlog}>
      <BlogFormRow>
        <InputLabel htmlFor="title">
          <Cell1>Title</Cell1>
          <Cell2>
            <BlogInput
              type="text"
              id="title"
              data-testid="titleInput"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
            />
          </Cell2>
        </InputLabel>
      </BlogFormRow>
      <BlogFormRow>
        <InputLabel htmlFor="author">
          <Cell1>Author</Cell1>
          <Cell2>
            {" "}
            <BlogInput
              type="text"
              id="author"
              data-testid="authorInput"
              value={newAuthor}
              onChange={(event) => setNewAuthor(event.target.value)}
            />
          </Cell2>
        </InputLabel>
      </BlogFormRow>
      <BlogFormRow>
        <InputLabel htmlFor="url">
          <Cell1>URL</Cell1>
          <Cell2>
            <BlogInput
              type="text"
              id="url"
              data-testid="urlInput"
              value={newUrl}
              onChange={(event) => setNewUrl(event.target.value)}
            />
          </Cell2>
        </InputLabel>
      </BlogFormRow>
      <BlogFormRow>
        <SubmitBlogButton type="submit" data-testid="blogSubmitButton">
          Submit
        </SubmitBlogButton>
      </BlogFormRow>
    </BlogFormContainer>
  );
};

BlogForm.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
};

export default BlogForm;
