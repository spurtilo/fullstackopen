import { useDispatch } from "react-redux";
import { handleLogout } from "../reducers/userReducer";

const Logout = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        type="button"
        data-testid="logoutButton"
        onClick={() => dispatch(handleLogout())}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
