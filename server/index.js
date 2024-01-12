const express = require('express');
require('dotenv').config();
const cors = require('cors');

const authRouter = require('./routes/authRouter');
const homeRouter = require('./routes/homeRouter');
const connectDB = require('./dbConfig');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = process.env.PORT;
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with your React app's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use('/auth', authRouter);
app.use('/', homeRouter);

app.listen(PORT, () => {
  console.log(`Server is connected at ${PORT}`);
});
