const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  req.token = null;

  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  }
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  // console.log("ERROR NAME: ", error.name);
  // console.log("ERROR MESSAGE: ", error.message);

  if (error.name === "CastError") {
    if (error.message.includes("Cast to ObjectId failed")) {
      res.status(400).json({
        error: "malformatted id",
      });
      return;
    }
    if (error.message.includes("Cast to Number failed")) {
      res.status(400).json({
        error: "invalid data format or type for value of `likes`",
      });
      return;
    }
    res.status(400).json({ error: error.message });
    return;
  }

  if (error.name === "ValidationError") {
    if (error.message.includes("shorter than the minimum")) {
      res.status(400).json({
        error: "`username` is shorter than the minimum allowed length (3)",
      });
      return;
    }
    if (error.message.includes("`username` is required")) {
      res.status(400).json({
        error: "`username` is required",
      });
      return;
    }
    res.status(400).json({ error: error.message });
    return;
  }

  if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    res.status(400).json({ error: "expected `username` to be unique" });
    return;
  }

  if (error.name === "JsonWebTokenError") {
    res.status(400).json({
      error: "token missing or invalid",
    });
    return;
  }

  next(error);
};

module.exports = {
  requestLogger,
  tokenExtractor,
  errorHandler,
  unknownEndpoint,
};
