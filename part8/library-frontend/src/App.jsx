import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useApolloClient, useSubscription } from '@apollo/client';
import { BOOK_ADDED } from './queries';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';

const App = () => {
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('library-token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      window.alert(`Added ${addedBook.title} by ${addedBook.author.name}`);
    },
  });

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
        <Route path="/" element={<Authors token={token} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/recommend" element={<Recommendations />} />
      </Routes>
    </div>
  );
};

export default App;
