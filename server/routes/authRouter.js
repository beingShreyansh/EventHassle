const express = require('express');
const router = express.Router();

const {
  createUser,
  loginUser,
  logoutUser,
} = require('../controller/authController');

const { verifyAccessToken } = require('../controller/jwtController');

// Define your authentication routes here
router.post('/login', loginUser);
router.post('/register', createUser);
router.get('/logout', logoutUser);

module.exports = router;
