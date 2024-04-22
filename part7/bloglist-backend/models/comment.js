const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
});

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    const updatedObject = {
      ...returnedObject,
      id: returnedObject._id.toString(),
    };
    delete updatedObject._id;
    delete updatedObject.__v;

    return updatedObject;
  },
});

module.exports = mongoose.model("Comment", commentSchema);
