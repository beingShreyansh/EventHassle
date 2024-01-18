const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  poster: { type: String, required: true },
  attendees: { type: [String], required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
