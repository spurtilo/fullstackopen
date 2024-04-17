import { useLogout } from "../contexts/AuthContext";

const Logout = () => {
  const logout = useLogout();
  return (
    <div>
      <button type="button" data-testid="logoutButton" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
