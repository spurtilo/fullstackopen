import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { handleLogin } from "../reducers/userReducer";

import Heading from "./Heading";

const MainHeading = styled.h1`
  margin: 0;
  padding: 0;
`;

const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 44.5rem;
  gap: 0.3rem;
  padding: 0;
  margin: 0;
`;

const LoginFormRow = styled.div`
  display: flex;
  align-items: center;
`;
const Cell1 = styled.div`
  flex: 1;
  padding: 0;
`;
const Cell2 = styled.div`
  flex: 1;
  padding: 0.5rem;
  padding-left: 0;
`;

const InputLabel = styled.label`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
`;

const LoginInput = styled.input`
  min-width: 90%;
  height: 1.5rem;
  margin-left: 0.5rem;
  border-radius: 0.3rem;
  box-shadow: 0 2px 4px #333333;
`;

const LoginButtonRow = styled.div`
  display: flex;
  min-width: 100%;
  padding: 0;
  margin: 0;
  justify-content: center;
`;

const LoginButton = styled.button`
  white-space: nowrap;
  padding: 0.3rem 0.5rem;
  margin: 0;
  margin-top: 0.9rem;
  width: 100%;
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

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    dispatch(handleLogin(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <MainHeading>The Bloglist</MainHeading>
      <Heading text="Log into application" headingType="h2" />
      <LoginFormContainer onSubmit={handleLoginFormSubmit}>
        <LoginFormRow>
          <InputLabel htmlFor="username">
            <Cell1>Username</Cell1>
            <Cell2>
              <LoginInput
                type="text"
                value={username}
                name="username"
                id="username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </Cell2>
          </InputLabel>
        </LoginFormRow>

        <LoginFormRow>
          <InputLabel htmlFor="password">
            <Cell1>Password</Cell1>
            <Cell2>
              <LoginInput
                type="password"
                value={password}
                name="password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Cell2>
          </InputLabel>
        </LoginFormRow>
        <LoginButtonRow>
          <LoginButton type="submit">Login</LoginButton>
        </LoginButtonRow>
      </LoginFormContainer>
    </>
  );
};

export default LoginForm;
