const express = require('express');
const { verifyAccessToken } = require('../controller/jwtController');
const Movie = require('../models/movieModel');
const {
  addMovie,
  deleteMovieByName,
  addEvent,
  deleteEventByName,
} = require('../controller/adminController');
const router = express.Router();

// Define your authentication routes here
router.post('/addMovie', verifyAccessToken, addMovie);
router.delete('/movies/:name', verifyAccessToken, deleteMovieByName);

router.post('/addEvent', verifyAccessToken, addEvent);
router.delete('/events/:name', verifyAccessToken, deleteEventByName);

module.exports = router;
