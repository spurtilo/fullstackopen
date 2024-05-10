import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries';

const NewBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n');
      console.log('ERROR:', messages);
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        const newBook = response.data.addBook;
        return {
          allBooks: [...allBooks, newBook],
        };
      });
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        const newAuthor = response.data.addBook.author;
        return {
          allAuthors: [...allAuthors, newAuthor],
        };
      });
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    createBook({ variables: { title, author, published, genres } });
    navigate('/books', { replace: true });

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="titleInput">
            title
            <input
              id="titleInput"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="authorInput">
            author
            <input
              id="authorInput"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="publishInput">
            published
            <input
              id="publishInput"
              type="number"
              value={published}
              onChange={({ target }) => setPublished(Number(target.value))}
            />
          </label>
        </div>
        <div>
          <label htmlFor="genreInput">
            <input
              id="genreInput"
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
          </label>
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
