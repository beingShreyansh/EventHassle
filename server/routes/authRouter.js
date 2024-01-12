const express = require('express');
const router = express.Router();

const { createUser, loginUser } = require('../controller/authController');

// Define your authentication routes here
router.post('/login', loginUser);
router.post('/register', createUser);

module.exports = router;
