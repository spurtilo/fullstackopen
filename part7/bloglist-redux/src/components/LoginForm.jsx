import { useState } from "react";
import { useDispatch } from "react-redux";

import { handleLogin } from "../reducers/userReducer";

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
    <div>
      <form onSubmit={handleLoginFormSubmit}>
        <div>
          <label htmlFor="Username">
            Username
            <input
              type="text"
              value={username}
              name="Username"
              id="Username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="Password">
            Password
            <input
              type="password"
              value={password}
              name="Password"
              id="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
