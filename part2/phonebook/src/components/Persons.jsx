import React from "react";
import DeleteButton from "./DeleteButton";

const Person = ({ person, deleteHandler }) => {
  return (
    <div className="personListItem">
      <div>
        {person.name} {person.number}{" "}
      </div>
      <div>
        <DeleteButton
          personId={person.id}
          name={person.name}
          deleteHandler={deleteHandler}
        />
      </div>
    </div>
  );
};

const Persons = ({ persons, deleteHandler }) => {
  return persons.map((person) => (
    <Person key={person.name} person={person} deleteHandler={deleteHandler} />
  ));
};

export default Persons;
