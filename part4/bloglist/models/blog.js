const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
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
