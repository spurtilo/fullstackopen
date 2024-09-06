import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries';
import { updateBooksCache, updateAuthorsCache } from '../utils/updateCache';

const NewBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n');
      console.log('ERROR:', messages);
    },
    update: (cache, response) => {
      const addedBook = response.data.addBook;
      const addedAuthor = response.data.addBook.author;
      updateBooksCache(cache, { query: ALL_BOOKS }, addedBook);
      updateAuthorsCache(cache, { query: ALL_AUTHORS }, addedAuthor);
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    createBook({
      variables: {
        title,
        author,
        published: published.length > 0 ? published : 'N/A',
        genres,
      },
    });
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
              onChange={({ target }) => setPublished(target.value)}
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
