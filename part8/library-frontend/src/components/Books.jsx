/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/self-closing-comp */
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = () => {
  const genres = [
    'refactoring',
    'agile',
    'patterns',
    'design',
    'crime',
    'classic',
  ];
  const [chosenGenre, setChosenGenre] = useState('');
  const { loading, data, refetch } = useQuery(ALL_BOOKS);

  if (loading) {
    return <div>loading...</div>;
  }

  if (data.allBooks.length === 0) {
    return (
      <div>
        <h2>Books</h2>
        No books to display
      </div>
    );
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
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {data.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
