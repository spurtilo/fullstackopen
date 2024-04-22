import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Heading from "./Heading";

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 44.5em;
`;

const UserList = styled.ul`
  margin: 0;
  padding-left: 1.5em;
`;

const UserInfo = () => {
  const { allUsers } = useSelector((state) => state.user);
  const { id } = useParams();
  const user = allUsers.find((u) => u.id === id);

  if (!user) {
    return null;
  }
  return (
    <UserContainer>
      <Heading text={`User : ${user.name}`} headingType="h2" />
      <Heading text="Added Blogs" headingType="h3" />
      <UserList>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </UserList>
    </UserContainer>
  );
};

export default UserInfo;
