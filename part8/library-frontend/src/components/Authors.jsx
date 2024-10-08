/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/self-closing-comp */
import { useState } from 'react';
import {
  useApolloClient,
  useQuery,
  useMutation,
  useSubscription,
} from '@apollo/client';
import { EDIT_AUTHOR, ALL_AUTHORS, BOOK_ADDED } from '../queries';
import { updateAuthorsCache } from '../utils/updateCache';

const Authors = ({ token }) => {
  const client = useApolloClient();
  const [birth, setBirth] = useState('');
  const [name, setName] = useState('');

  const { loading, data: authorsData } = useQuery(ALL_AUTHORS);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      updateAuthorsCache(
        client.cache,
        { query: ALL_AUTHORS },
        addedBook.author
      );
    },
  });

  const [updateBirthYear] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n');
      console.log('ERROR:', messages);
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        const updatedAuthor = response.data.editAuthor;
        return {
          allAuthors: allAuthors.map((author) =>
            author.id === updatedAuthor.id ? updatedAuthor : author
          ),
        };
      });
    },
  });

  if (loading) {
    return <div>loading...</div>;
  }
  const authors = authorsData?.allAuthors || [];

  const submit = (event) => {
    event.preventDefault();

    updateBirthYear({ variables: { name, setBornTo: birth } });

    setName(authors[0].name);
    setBirth('');
  };

  if (authors.length === 0) {
    return (
      <div>
        <h2>Authors</h2>
        No authors to display
      </div>
    );
  }

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
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {token && (
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
              <label htmlFor="birthInput">
                Born
                <input
                  id="birthInput"
                  type="number"
                  value={birth}
                  onChange={({ target }) => setBirth(Number(target.value))}
                />
              </label>
            </div>
            <button type="submit">Update author</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Authors;
