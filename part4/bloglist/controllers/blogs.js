const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const blog = new Blog(req.body);

  const result = await blog.save();
  res.status(201).json(result);
});

blogsRouter.put("/:id", async (req, res) => {
  const { title, author, url, likes } = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      title,
      author,
      url,
      likes,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedBlog) {
    res.status(404).json({ error: "Blog not found" });
    return;
  }
  res.json(updatedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const blogToDelete = await Blog.findByIdAndDelete(req.params.id);

  if (!blogToDelete) {
    res.status(404).json({ error: "Blog not found" });
    return;
  }

  res.status(204).end();
});

module.exports = blogsRouter;
