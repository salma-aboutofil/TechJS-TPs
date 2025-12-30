const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});


const User = mongoose.model('books', bookSchema);

module.exports = Book;
