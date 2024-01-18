import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard/MovieCard';

const apiURL = 'http://localhost:3001';

function Home() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${apiURL}/getMovies`);
        const data = response.data;
        if (response.status === 200) {
          setMovies(data.movies);
        } else {
          console.error('Failed to fetch movies:', data.message);
        }
      } catch (error) {
        console.error('Error during fetch:', error.message);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${apiURL}/getEvents`);
        const data = response.data;

        if (response.status === 200) {
          setEvents(data.events);
        } else {
          console.error('Failed to fetch Events:', data.message);
        }
      } catch (error) {
        console.error('Error during fetch:', error.message);
      }
    };
    fetchMovies();
    fetchEvents();
  }, []);

  return (
    <div className="home-container">
      <h2 className="recommended-heading ">Receommended Movies</h2>
      <div className="card-container">
        {movies.map((movie) => (
          <div
            className="each-card"
            key={movie._id}
            onClick={() => navigate(`/movie/${movie.name}`)}
          >
            <MovieCard
              name={movie.name}
              poster={movie.poster}
              genre={movie.genre}
            />
          </div>
        ))}
      </div>
      <h2 className="recommended-heading ">Receommended Events</h2>
      <div className="card-container">
        {events.map((event) => (
          <div
            className="each-card"
            key={event._id}
            onClick={() => navigate(`/event/${event.title}`)}
          >
            <MovieCard
              name={event.title}
              poster={event.poster}
              genre={[event.category]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
