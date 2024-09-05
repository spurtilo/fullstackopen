import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import { ALL_AUTHORS, BOOK_ADDED } from './queries';
import { updateAuthorsCache } from './utils/updateCache';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';

const App = () => {
  const [token, setToken] = useState(null);
  const result = useQuery(ALL_AUTHORS);
  const client = useApolloClient();
  const navigate = useNavigate();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addeAuthor = data.data.bookAdded.author;
      updateAuthorsCache(client.cache, { query: ALL_AUTHORS }, addeAuthor);
    },
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('library-token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    navigate('/', { replace: true });
  };

  return (
    <div>
      <Link to="/">
        <button type="button">authors</button>
      </Link>
      <Link to="/books">
        <button type="button">books</button>
      </Link>
      {token ? (
        <>
          <Link to="/add">
            <button type="button">add book</button>
          </Link>
          <Link to="/recommend">
            <button type="button">recommend</button>
          </Link>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <Link to="/login">
          <button type="button">login</button>
        </Link>
      )}

      <Routes>
        <Route
          path="/"
          element={<Authors authors={result.data.allAuthors} token={token} />}
        />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/recommend" element={<Recommendations />} />
      </Routes>
    </div>
  );
};

export default App;
