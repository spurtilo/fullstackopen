import { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const getAll = async () => {
    try {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources: ", error);
    }
  };
  useEffect(() => {
    getAll();
  }, []);

  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource);
      setResources([...resources, response.data]);
    } catch (error) {
      console.error("Error creating a resource: ", error);
    }
  };

  const service = {
    create,
  };

  return [resources, service];
};

const App = () => {
  const { reset: resetContent, ...contentProps } = useField("text");
  const { reset: resetName, ...nameProps } = useField("text");
  const { reset: resetNumber, ...numberProps } = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: contentProps.value });
    resetContent();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: nameProps.value, number: numberProps.value });
    resetName();
    resetNumber();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...contentProps} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...nameProps} /> <br />
        number <input {...numberProps} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
