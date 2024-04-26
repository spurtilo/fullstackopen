import { Routes, Route, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "./queries";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Link to="/">
        <button type="button">authors</button>
      </Link>
      <Link to="/books">
        <button type="button">books</button>
      </Link>
      <Link to="/add">
        <button type="button">add book</button>
      </Link>

      <Routes>
        <Route
          path="/"
          element={<Authors authors={result.data.allAuthors} />}
        />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
