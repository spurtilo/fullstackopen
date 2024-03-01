const loginForm = ({
  usernameValue,
  passwordValue,
  usernameHandler,
  passwordHandler,
  loginHandler,
}) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={loginHandler}>
      <div>
        <label htmlFor="Username">Username</label>
        <input
          type="text"
          value={usernameValue}
          name="Username"
          onChange={usernameHandler}
        />
      </div>
      <div>
        <label htmlFor="Password">Password</label>
        <input
          type="text"
          value={passwordValue}
          name="Password"
          onChange={passwordHandler}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
);

export default loginForm;
