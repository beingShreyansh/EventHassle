const express = require('express');
const { getEventVenue } = require('../controller/bookingController');
const { verifyAccessToken } = require('../controller/jwtController');
const router = express.Router();

// const { verifyAccessToken } = require('../controller/jwtController');

// Define your authentication routes here
router.get('/getEventVenue/:name', verifyAccessToken, getEventVenue);
// router.post('/getMovieVenue/:name', getMovieVenue);

module.exports = router;
