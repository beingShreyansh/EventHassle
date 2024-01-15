const express = require('express');
const { verifyAccessToken } = require('../controller/jwtController');
const Movie = require('../models/movieModel');
const {
  addMovie,
  deleteMovieByName,
} = require('../controller/adminController');
const router = express.Router();

// Define your authentication routes here
router.post('/addMovie', verifyAccessToken, addMovie);
router.delete('/movies/:name', verifyAccessToken, deleteMovieByName);

module.exports = router;
