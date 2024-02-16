import React from "react";

const PersonForm = ({
  id,
  nameValue,
  numberValue,
  nameHandler,
  numberHandler,
  submitHandler,
}) => {
  return (
    <form id={id} onSubmit={submitHandler}>
      <div>
        <label htmlFor="nameInput">Name: </label>
        <input id="nameInput" value={nameValue} onChange={nameHandler} />
      </div>
      <div>
        <label htmlFor="numberInput">Number: </label>
        <input id="numberInput" value={numberValue} onChange={numberHandler} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;
