const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const logger = require("./utils/logger");

const app = express();

mongoose.set("strictQuery", false);

logger.info("Connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;
