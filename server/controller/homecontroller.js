const Event = require('../models/eventModel');
const Movie = require('../models/movieModel');

const getMovies = async (req, res) => {
  const { pageLimit, page } = req.body;
  try {
    const movies = await Movie.find({})
      .select({ name: 1, genre: 1, poster: 1 })
      .limit(pageLimit * 1)
      .skip((page - 1) * pageLimit)
      .sort({ releaseDate: -1 })
      .exec();
    res.json({ success: true, movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
const getMovieByName = async (req, res) => {
  const { name } = req.params;
  try {
    const movie = await Movie.findOne({ name });
    if (movie) res.json({ success: true, movie });
    else res.status(412).json({ message: 'Internal Server Error' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getEvents = async (req, res) => {
  const { pageLimit, page } = req.body;
  try {
    const events = await Event.find({})
      .select({ title: 1, genre: 1, poster: 1, category: 1 })
      .limit(pageLimit * 1)
      .skip((page - 1) * pageLimit)
      .sort({ date: -1 })
      .exec();
    res.json({ success: true, events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
const getEventByname = async (req, res) => {
  const { name } = req.params;
  try {
    const event = await Event.findOne({ title: name });
    if (event) res.json({ success: true, event });
    else res.status(412).json({ message: 'Internal Server Error' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { getMovies, getMovieByName, getEvents, getEventByname };
