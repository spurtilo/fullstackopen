import { useState, useEffect } from "react";
import personService from "./services/persons";
import Header from "./components/Header";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

function filterNames(personsArray, searchTerm) {
  const searchResult = personsArray.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );
  return searchResult.length > 0 ? searchResult : personsArray;
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState({
    message: null,
    type: "success",
  });

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        handleNotification(
          "Failed to fetch data. Please try again later.",
          "error"
        );
      });
  }, []);

  const handleNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  };

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
          handleNotification(`Added ${newName}`, "success");
        })
        .catch((error) => {
          console.error("Error creating a person:", error);
          handleNotification(error.response.data.error, "error");
        });
      setNewName("");
      setNewNumber("");
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
        handleNotification(`Updated ${returnedPerson.name}`, "success");
      })
      .catch((error) => {
        console.error("Error updating a person:", error);
        if (error.response.data.error) {
          handleNotification(error.response.data.error, "error");
        } else {
          handleNotification(
            `Information of ${updatedPerson.name} has already been removed from server`,
            "error"
          );
        }
      });
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          handleNotification(`Deleted ${name}`, "success");
        })
        .catch((error) => {
          console.error("Error deleting a person:", error);
          handleNotification(
            `Failed to delete ${name}. Please try again.`,
            "error"
          );
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
      <Header text="Phonebook" />
      <Notification message={notification.message} type={notification.type} />
      <Filter
        id="filterInput"
        value={newFilter}
        eventHandler={handleFilterChange}
      />

      <Header text="Add New Number" />
      <PersonForm
        id="personForm"
        nameValue={newName}
        numberValue={newNumber}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
        submitHandler={handleAdding}
      />

      <Header text="Numbers" />
      <Persons persons={personsToShow} deleteHandler={handleDelete} />
    </div>
  );
};

export default App;
