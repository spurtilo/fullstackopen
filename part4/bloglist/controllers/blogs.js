const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    res.status(401).json({
      error: "token invalid",
    });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    url,
    title,
    author,
    user: user._id,
    likes,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
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
