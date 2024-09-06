/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/self-closing-comp */
import { useState } from 'react';
import { useQuery, useApolloClient, useSubscription } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED } from '../queries';
import { updateBooksCache } from '../utils/updateCache';

const Books = () => {
  const [chosenGenre, setChosenGenre] = useState('');
  const client = useApolloClient();
  const genres = [
    'refactoring',
    'agile',
    'patterns',
    'design',
    'crime',
    'classic',
  ];

  const { loading, data: booksData, refetch } = useQuery(ALL_BOOKS);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      updateBooksCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  if (loading) {
    return <div>loading...</div>;
  }

  const filterByGenre = (genre) => {
    refetch({ genre });
    setChosenGenre(genre);
  };

  return (
    <div>
      <h2>Books</h2>
      {chosenGenre && <p>in genre {chosenGenre}</p>}
      <div>
        {genres.map((genre) => (
          <button
            type="button"
            key={genre}
            value={genre}
            onClick={() => filterByGenre(genre)}
          >
            {genre}
          </button>
        ))}
        <button type="button" onClick={() => filterByGenre('')}>
          all genres
        </button>
      </div>

      {booksData.allBooks.length === 0 ? (
        <div>
          <h3>No books to display</h3>
        </div>
      ) : (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>Author</th>
              <th>Published</th>
            </tr>
            {booksData.allBooks.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Books;
