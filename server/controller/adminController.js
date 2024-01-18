const Event = require('../models/eventModel');
const Movie = require('../models/movieModel');

const addMovie = async (req, res) => {
  try {
    const movie = req.body;

    if (!movie) {
      return res.status(405).send('Field Missing');
    }

    const newMovie = new Movie(movie);

    await newMovie.save();

    res.status(201).json({ msg: 'success' });
  } catch (error) {
    console.error('Error adding user:', error.message);
    res.status(500).send(error.message);
  }
};

const deleteMovieByName = async (req, res) => {
  try {
    const { name } = req.params;
    if (!name) {
      return res.status(405).send('Field Missing');
    }
    const existingMovie = await Movie.findOne({ name });
    if (!existingMovie) {
      return res.status(400).json({ error: 'Movie not found!' });
    }
    await existingMovie.deleteOne();
    res.status(201).json({ msg: 'success' });
  } catch (error) {
    console.error('Error adding user:', error.message);
    res.status(500).send(error.message);
  }
};

const addEvent = async (req, res) => {
  try {
    const event = req.body;

    if (!event) {
      return res.status(405).send('Field Missing');
    }

    const newEvent = new Event(event);

    await newEvent.save();

    res.status(201).json({ msg: 'success' });
  } catch (error) {
    console.error('Error adding user:', error.message);
    res.status(500).send(error.message);
  }
};

const deleteEventByName = async (req, res) => {
  try {
    const { title } = req.params;

    if (!title) {
      return res.status(405).send('Field Missing');
    }
    const existingEvent = await Movie.findOne({ title });
    if (!existingEvent) {
      return res.status(400).json({ error: 'Event not found!' });
    }
    await existingEvent.deleteOne();
    res.status(201).json({ msg: 'success' });
  } catch (error) {
    console.error('Error adding user:', error.message);
    res.status(500).send(error.message);
  }
};

module.exports = { addMovie, deleteMovieByName, addEvent, deleteEventByName };
