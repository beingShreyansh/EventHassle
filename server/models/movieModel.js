const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cast: { type: [String], required: true },
    genre: { type: [String], required: true },
    poster: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    bio: { type: String, required: true },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
