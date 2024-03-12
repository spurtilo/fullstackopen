import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            value={newTitle}
            name="Title"
            id="Title"
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="Author">Author</label>
          <input
            type="text"
            value={newAuthor}
            name="Author"
            id="Author"
            onChange={(event) => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="URL">URL</label>
          <input
            type="text"
            value={newUrl}
            name="URL"
            id="URL"
            onChange={(event) => setNewUrl(event.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BlogForm;
