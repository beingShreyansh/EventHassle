const express = require('express');
const {
  getMovieByName,
  getMovies,
  getEventByname,
  getEvents,
} = require('../controller/homecontroller');

const router = express.Router();

// Define your authentication routes here
router.post('/getMovies', getMovies);
router.get('/getMovieByname/:name', getMovieByName);

router.post('/getEvents', getEvents);
router.get('/getEventByname/:name', getEventByname);

module.exports = router;
