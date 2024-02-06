import React from "react";

const DeleteButton = ({ personId, name, deleteHandler }) => {
  return (
    <button type="button" onClick={() => deleteHandler(personId, name)}>
      Delete
    </button>
  );
};

export default DeleteButton;
