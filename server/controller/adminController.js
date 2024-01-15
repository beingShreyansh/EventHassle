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
    console.log(req.params.name);
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

module.exports = { addMovie, deleteMovieByName };
