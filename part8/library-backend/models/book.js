const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
  },
  published: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  genres: [{ type: String }],
});

schema.index({ author: 1, title: 1 }, { unique: true });

schema.plugin(uniqueValidator);

module.exports = mongoose.model('Book', schema);
