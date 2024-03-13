import PropTypes from "prop-types";

const Logout = ({ logoutHandler }) => (
  <p>
    <button type="button" onClick={logoutHandler}>
      Logout
    </button>
  </p>
);

Logout.propTypes = {
  logoutHandler: PropTypes.func.isRequired,
};

export default Logout;
