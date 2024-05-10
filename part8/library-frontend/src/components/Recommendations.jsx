/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/self-closing-comp */
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, CURRENT_USER } from '../queries';

const Recommendations = () => {
  const { data: userData } = useQuery(CURRENT_USER);
  const { loading: booksLoading, data: booksData } = useQuery(ALL_BOOKS);

  if (booksLoading) {
    return <div>loading...</div>;
  }

  if (booksData.allBooks.length === 0) {
    return (
      <div>
        <h2>Books</h2>
        No books to display
      </div>
    );
  }

  const favoriteBooks = userData
    ? booksData.allBooks.filter((book) =>
        book.genres.includes(userData.me.favoriteGenre)
      )
    : booksData.allBooks;

  return (
    <div>
      <h2>Recommendations</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {favoriteBooks.map((b) => (
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

export default Recommendations;
