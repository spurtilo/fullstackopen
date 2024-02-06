import React from "react";

const Filter = ({ id, value, eventHandler }) => {
  return (
    <>
      Filter shown with: <input id={id} value={value} onChange={eventHandler} />
    </>
  );
};

export default Filter;
