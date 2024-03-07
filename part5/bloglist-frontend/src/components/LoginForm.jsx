const loginForm = ({
  usernameValue,
  passwordValue,
  usernameHandler,
  passwordHandler,
  loginHandler,
}) => (
  <div>
    <form onSubmit={loginHandler}>
      <div>
        <label htmlFor="Username">Username</label>
        <input
          type="text"
          value={usernameValue}
          name="Username"
          id="Username"
          onChange={usernameHandler}
        />
      </div>
      <div>
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          value={passwordValue}
          name="Password"
          id="Password"
          onChange={passwordHandler}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
);

export default loginForm;
