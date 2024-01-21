const Event = require('../models/eventModel');
const Venue = require('../models/eventVenueModel');

const getEventVenue = async (req, res) => {
  const { name } = req.params;
  try {
    const event = await Event.findOne({ title: name });

    const venueName = event.location;

    const venue = await Venue.findOne({ venueName });

    if (venue) res.json({ success: true, venue });
    else res.status(412).json({ message: 'Internal Server Error' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { getEventVenue };
