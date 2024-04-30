/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/self-closing-comp */
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";

const Authors = ({ authors }) => {
  const [name, setName] = useState(authors[0].name);
  const [birth, setBirth] = useState("");

  const [updateBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      console.log("ERROR:", messages);
    },
  });

  const submit = (event) => {
    event.preventDefault();

    updateBirthYear({ variables: { name, setBornTo: birth } });

    setName(authors[0].name);
    setBirth("");
  };

  return (
    <div>
      <div>
        <h2>Authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Set Birthyear</h2>
        <form onSubmit={submit}>
          <div>
            <label htmlFor="authorSelect">
              Author
              <select
                id="authorSelect"
                value={name}
                onChange={({ target }) => setName(target.value)}
              >
                {authors.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="yearInput">
              Born
              <input
                id="yearInput"
                type="number"
                value={birth}
                onChange={({ target }) => setBirth(Number(target.value))}
              />
            </label>
          </div>
          <button type="submit">Update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
