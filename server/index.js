const express = require('express');
require('dotenv').config();
const cors = require('cors');

const connectDB = require('./dbConfig');
const cookieParser = require('cookie-parser');
const {
  adminRouter,
  authRouter,
  homeRouter,
  bookingRouter,
  paymentRouter,
} = require('./routes');

const app = express();

const PORT = process.env.PORT;
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/booking', bookingRouter);
app.use('/payment', paymentRouter);

app.listen(PORT, () => {
  console.log(`Server is connected at ${PORT}`);
});
