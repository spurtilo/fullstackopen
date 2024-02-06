import { useState, useEffect } from "react";
import personService from "./services/persons";

const Header = ({ text }) => {
  return <h2>{text}</h2>;
};

const Filter = ({ id, value, eventHandler }) => {
  return (
    <>
      Filter shown with: <input id={id} value={value} onChange={eventHandler} />
    </>
  );
};

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
        Name:{" "}
        <input id={"nameInput"} value={nameValue} onChange={nameHandler} />
      </div>
      <div>
        Number:{" "}
        <input
          id={"numberInput"}
          value={numberValue}
          onChange={numberHandler}
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

const DeleteButton = ({ personId, name, deleteHandler }) => {
  return (
    <button type="button" onClick={() => deleteHandler(personId, name)}>
      Delete
    </button>
  );
};

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

function filterNames(personsArray, searchTerm) {
  const searchResult = personsArray.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );
  if (searchResult.length > 0) {
    return searchResult;
  }
  return personsArray;
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleAdding = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const updateConfirmation = window.confirm(
        `${newName} is already added to phonebook. Do you want to replace the old number with a new one?`
      );
      if (updateConfirmation) {
        handleUpdate(existingPerson);
      } else {
        console.log("Update cancelled.");
      }
    } else {
      const personObject = {
        name: newName.trim(),
        number: newNumber.trim(),
      };

      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("Error creating a person:", error);
        });
    }
  };

  const handleUpdate = (existingPerson) => {
    const updatedPerson = { ...existingPerson, number: newNumber.trim() };

    personService
      .update(existingPerson.id, updatedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== existingPerson.id ? person : returnedPerson
          )
        );
      })
      .catch((error) => {
        console.error("Error updating a person:", error);
      });
  };

  const handleDelete = (personId, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(personId)
        .then((deletedObject) => {
          setPersons(
            persons.filter((person) => person.id !== deletedObject.id)
          );
        })
        .catch((error) => {
          console.error("Error deleting a person:", error);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);

    if (newFilter.length > 0) {
      setShowAll(false);
    } else {
      setShowAll(true);
    }
  };

  const personsToShow = showAll ? persons : filterNames(persons, newFilter);

  return (
    <div>
      <Header text={"Phonebook"} />
      <Filter
        id={"filterInput"}
        value={newFilter}
        eventHandler={handleFilterChange}
      />

      <Header text={"Add New Number"} />
      <PersonForm
        id={"personForm"}
        nameValue={newName}
        numberValue={newNumber}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
        submitHandler={handleAdding}
      />

      <Header text={"Numbers"} />
      <Persons persons={personsToShow} deleteHandler={handleDelete} />
    </div>
  );
};

export default App;
