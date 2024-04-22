import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ToggleButton = styled.button`
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

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <ToggleButton type="button" onClick={toggleVisibility}>
          {buttonLabel}
        </ToggleButton>
      </div>
      <div style={showWhenVisible}>
        {children}
        <ToggleButton type="button" onClick={toggleVisibility}>
          Cancel
        </ToggleButton>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
