export const updateBooksCache = (cache, query, addedBook) => {
  const uniqByTitleAndAuthor = (a) => {
    const seen = new Set();
    return a.filter((obj) => {
      const k = `${obj.title}${obj.author.name}`;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitleAndAuthor([...allBooks, addedBook]),
    };
  });
};

export const updateAuthorsCache = (cache, query, addedAuthor) => {
  const uniqByName = (a) => {
    const seen = new Set();
    return a.filter((obj) => {
      const k = obj.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allAuthors }) => {
    return {
      allAuthors: uniqByName([...allAuthors, addedAuthor]),
    };
  });
};
