import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MoviePoster from '../components/MoviePoster/MoviePoster';
import './EventPage.css'; // Import a CSS file for styling


const EventPage = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [event, setEvent] = useState();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getEventByName/${name}`);
        const data = response.data;
        if (response.status === 200) {
          setEvent(data.event);
        } else {
          console.error('Failed to fetch movies:', data.message);
        }
      } catch (error) {
        console.error('Error during fetch:', error.message);
      }
    };
    fetchEvent();
  }, [name]);

  const handleEventBooking = (e) => {
    e.preventDefault();
    navigate(`/event/booking/${name}`);

  };

  return (
    <div className="movie-page-container">
      <h1 className="movie-title">{event?.title}</h1>

      <div className="movie-poster-container">
        <MoviePoster poster={event?.poster} width={'600px'} />
      </div>

      <div className="movie-info-container">
        <p className="event-date">Event Date: {event?.date.slice(0, 10)}</p>
        <p className="event-date">Book now at: {event?.price}</p>
        <p className="genres">Genres: {event?.category}</p>
        <h2 className="artist-name">Artist: {event?.attendees.join(', ')}</h2>
        <p className="description">{event?.bio}</p>
        <button
          className="btn center-text"
          onClick={(e) => {
            handleEventBooking(e);
          }}
        >
          Book now!
        </button>
      </div>
    </div>
  );
};

export default EventPage;
