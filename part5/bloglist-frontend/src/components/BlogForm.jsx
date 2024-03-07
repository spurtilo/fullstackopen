const blogForm = ({
  titleValue,
  authorValue,
  urlValue,
  titleHandler,
  authorHandler,
  urlHandler,
  submitHandler,
}) => (
  <div>
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="Title">Title</label>
        <input
          type="text"
          value={titleValue}
          name="Title"
          id="Title"
          onChange={titleHandler}
        />
      </div>
      <div>
        <label htmlFor="Author">Author</label>
        <input
          type="text"
          value={authorValue}
          name="Author"
          id="Author"
          onChange={authorHandler}
        />
      </div>
      <div>
        <label htmlFor="URL">URL</label>
        <input
          type="text"
          value={urlValue}
          name="URL"
          id="URL"
          onChange={urlHandler}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
);

export default blogForm;
