import React from "react";

const Filter = ({ id, value, eventHandler }) => {
  return (
    <>
      <label htmlFor={id}>Filter shown with: </label>
      <input id={id} value={value} onChange={eventHandler} />
    </>
  );
};

export default Filter;
