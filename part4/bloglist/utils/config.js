require("dotenv").config();

const PORT = process.env.PORT; // eslint-disable-line
const MONGODB_URI = process.env.MONGODB_URI; // eslint-disable-line

module.exports = {
  MONGODB_URI,
  PORT,
};
