const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
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
    res.status(400).json({
      error: "CastError: Invalid data format or type, or malformatted id",
    });
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

  next(error);
};

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
};
