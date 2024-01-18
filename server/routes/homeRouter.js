const express = require('express');
const { verifyAccessToken } = require('../controller/jwtController');
const Movie = require('../models/movieModel');
const Event = require('../models/eventModel');
const {
  getMovies,
  getMovieByName,
  getEvents,
  getEventByname,
} = require('../controller/Homecontroller');
const router = express.Router();

// Define your authentication routes here
router.get('/getMovies', getMovies);
router.get('/getMovieByname/:name', getMovieByName);

router.get('/getEvents', getEvents);
router.get('/getEventByname/:name', getEventByname);


module.exports = router;
