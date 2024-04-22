import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { getUsers } from "../reducers/userReducer";

import Heading from "./Heading";

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 44.5rem;
  padding: 0;
  border: solid 2px #ffffff;
  border-radius: 0.3rem;
`;
const UserRow = styled.div`
  display: flex;
  flex-direction: row;
  background: ${(props) => (props.$dark ? "#333333" : "#ffffff")};
  color: ${(props) => (props.$dark ? "#ffffff" : "#333333")};
  font-weight: ${(props) => (props.$dark ? "500" : "600")};
  a {
    color: ${(props) => (props.$dark ? "#ffffff" : "#333333")};
    &:hover {
      color: #ababab;
    }
  }
`;

const UserCell1 = styled.div`
  flex: 1;
  padding: 10px;
  border-right: solid 1px ${(props) => (props.$dark ? "#ffffff" : "#333333")};
`;

const UserCell2 = styled.div`
  flex: 2;
  padding: 0.6rem;
`;

const HeaderText = styled.div`
  display: flex;
  max-width: 44.5rem;
  flex-direction: column;
  margin-bottom: 2em;
`;

const Users = () => {
  const { allUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <Heading text="List of Users" headingType="h2" />
      <HeaderText>
        This page displays a list of users. Click on a user&apos;s name to view
        the blogs linked by them. Explore the content shared and recommended by
        each user and discover their contributions to our platform.
      </HeaderText>
      <UserContainer>
        <UserRow $dark>
          <UserCell1 $dark>
            <strong>NAME</strong>
          </UserCell1>
          <UserCell2 $dark>
            <strong>BLOGS CREATED</strong>
          </UserCell2>
        </UserRow>
        {allUsers.map((user, index) => {
          const isDark = index % 2 !== 0;
          return (
            <UserRow key={user.id} $dark={isDark}>
              <UserCell1 $dark={isDark}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </UserCell1>
              <UserCell2 $dark={isDark}>{user.blogs.length}</UserCell2>
            </UserRow>
          );
        })}
      </UserContainer>
    </>
  );
};

export default Users;
