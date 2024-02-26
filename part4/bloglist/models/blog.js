const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    const updatedObject = { ...returnedObject };

    updatedObject.id = returnedObject._id.toString();
    delete updatedObject._id;
    delete updatedObject.__v;

    return updatedObject;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
