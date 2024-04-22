import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const BlogListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.6rem;
  margin-bottom: 0.6rem;
  border: solid 1px #ffffff;
  border-radius: 0.3rem;
  max-width: 44.5rem;
  background-color: #333333;
  color: #ffffff;
  box-shadow: 0 2px 4px #333333;
  transition: color 0.2s ease;
  &:hover {
    background: #ffffff;
    color: #333333;
    font-weight: 600;
    border: solid 1px #333333;
  }
  a {
    text-decoration: none;
    gap: inherit;
    color: inherit;
  }
`;

const BlogListItem = ({ blog }) => {
  return (
    <BlogListItemContainer data-testid="blogItemTitle">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title}
        {" - "}
        {blog.author}
      </Link>
    </BlogListItemContainer>
  );
};

BlogListItem.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
    likes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogListItem;
