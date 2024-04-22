import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { handleLogout } from "../reducers/userReducer";

const LogoutContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const LogoutButton = styled.button`
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

const Logout = () => {
  const { userDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <LogoutContainer>
      {userDetails.name} is logged in
      <LogoutButton
        type="button"
        data-testid="logoutButton"
        onClick={() => dispatch(handleLogout())}
      >
        Logout
      </LogoutButton>
    </LogoutContainer>
  );
};

export default Logout;
