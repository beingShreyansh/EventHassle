const mongoose = require('mongoose');

const ticketTypeSchema = new mongoose.Schema({
  ticketName: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Number, required: true },
});

const venueSchema = new mongoose.Schema({
  venueName: { type: String, required: true },
  venueLocation: { type: String, required: true },
  ticketTypes: [ticketTypeSchema],
});

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;
