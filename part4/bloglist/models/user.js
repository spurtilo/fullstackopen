const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    const updatedObject = { ...returnedObject };

    updatedObject.id = returnedObject._id.toString();
    delete updatedObject._id;
    delete updatedObject.__v;

    return updatedObject;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
