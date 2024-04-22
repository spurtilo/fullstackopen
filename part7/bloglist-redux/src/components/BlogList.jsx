import { useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Heading from "./Heading";
import BlogListItem from "./BlogListItem";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const BlogListContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 44.5em;
  margin: 0;
  padding: 0;
  margin-bottom: 2rem;
`;
const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5em;
`;

const BlogList = () => {
  const blogFormRef = useRef(null);
  const blogs = useSelector((state) => state.blogs);
  return (
    <BlogListContainer>
      <HeaderText>
        <Heading text="Welcome to The Bloglist!" headingType="h2" />
        Explore our curated collection of blogs covering a wide range of topics,
        and contribute your own by adding a new blog link below. Whether
        you&apos;re seeking inspiration, information, or entertainment,
        there&apos;s something for everyone. Click on any link below to start
        exploring or add your own blog to the list!
      </HeaderText>
      <Heading text="Add a New Blog" headingType="h2" />
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm
          toggleVisibility={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>
      <br />
      {blogs.map((blog) => (
        <BlogListItem key={blog.id} blog={blog} />
      ))}
    </BlogListContainer>
  );
};

export default BlogList;
