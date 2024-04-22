import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";

import Logout from "./Logout";

const NavContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  max-width: 44.5em;
  margin: 0;
  padding: 1rem 0;
  gap: 1rem;
`;

const MainHeading = styled.h1`
  margin: 0;
  padding: 0;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavButton = styled.button`
  background: #333333;
  color: #ffffff;
  box-shadow: 0 2px 4px #333333;
  border: solid 1px RGB(226, 223, 218);
  border-radius: 0.3rem;
  height: 3rem;
  width: 5rem;
  padding: 0.3em;
  margin: 0px;
  font-family: "Source Sans 3", sans-serif;
  font-weight: 500;
  font-size: 1em;
  transition: color 0.2s ease;
  &:hover {
    background: #ffffff;
    color: #333333;
    font-weight: 600;
    cursor: pointer;
  }
`;

const NavBar = () => {
  return (
    <NavContainer>
      <MainHeading>The Bloglist</MainHeading>
      <LinkContainer>
        <Link to="/">
          <NavButton>BLOGS</NavButton>
        </Link>
        <Link to="/users">
          <NavButton>USERS</NavButton>
        </Link>
      </LinkContainer>
      <Logout />
    </NavContainer>
  );
};

export default NavBar;
