import { useState } from "react";
import { useLogin } from "../contexts/AuthContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();

  const handleLogin = async (event) => {
    event.preventDefault();
    await login(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
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
