import { useState } from "react";

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

const Persons = ({ persons }) => {
  return persons.map((person) => <Person key={person.name} person={person} />);
};

const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [showAll, setShowAll] = useState(true);

  const addName = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook.`);
    } else {
      const personObject = {
        name: newName.trim(),
        number: newNumber.trim(),
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
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
        submitHandler={addName}
      />

      <Header text={"Numbers"} />
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
