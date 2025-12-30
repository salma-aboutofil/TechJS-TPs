const express = require('express')
const app = express();
const port = 3000;
app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bookJS')
  .then(() => console.log('Connected '))
    .catch(err => console.error('failed:', err));
  
app.get('/books', (req, res) => {
  res.send('');
});

