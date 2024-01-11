const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

const PORT = process.env.PORT;

app.use(
  cors({
    origin: 'localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.get('/', (req, res) => {
  res.send('book tickets');
});

app.listen(PORT, () => {
  console.log(`Server is connected at ${PORT}`);
});
