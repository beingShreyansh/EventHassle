const express = require('express');
const { verifyAccessToken } = require('../controller/jwtController');
const Movie = require('../models/movieModel');
const router = express.Router();

// Define your authentication routes here
router.get('/getMovies', async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json({ success: true, movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
