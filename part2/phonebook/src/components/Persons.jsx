import React from "react";
import DeleteButton from "./DeleteButton";

const Person = ({ person, deleteHandler }) => {
  return (
    <p>
      {person.name} {person.number}{" "}
      <DeleteButton
        personId={person.id}
        name={person.name}
        deleteHandler={deleteHandler}
      />
    </p>
  );
};

const Persons = ({ persons, deleteHandler }) => {
  return persons.map((person) => (
    <Person key={person.name} person={person} deleteHandler={deleteHandler} />
  ));
};

export default Persons;
