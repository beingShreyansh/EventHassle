import React, { useState } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    location: '',
    poster: '',
    attendees: [],
    description: '',
    category: '',
    price: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleAttendeesChange = (e) => {
    const attendees = e.target.value
      .split(',')
      .map((attendee) => attendee.trim());
    setEventData({
      ...eventData,
      attendees,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the eventData, such as sending it to an API
    console.log('Event data submitted:', eventData);
  };

  return (
    <div>
      <AdminNavbar />
      {/* <h1>Add Event</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Date:
          <input
            type="datetime-local"
            name="date"
            value={eventData.date}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Poster URL:
          <input
            type="text"
            name="poster"
            value={eventData.poster}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Attendees (comma-separated):
          <input
            type="text"
            name="attendees"
            value={eventData.attendees.join(',')}
            onChange={handleAttendeesChange}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Category:
          <input
            type="text"
            name="category"
            value={eventData.category}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            name="price"
            value={eventData.price}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};

export default AddEvent;
