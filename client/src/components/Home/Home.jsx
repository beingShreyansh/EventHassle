import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard/MovieCard';

const pageLimit = 5;

function Home() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [events, setEvents] = useState([]);

  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/getMovies`,
          {
            pageLimit,
            pageNumber: currPage,
          }
        );
        const data = response.data;
        if (response.status === 200) {
          setMovies(data.movies);
          setCurrPage(data.page);
        } else {
          console.error('Failed to fetch movies:', data.message);
        }
      } catch (error) {
        console.error('Error during fetch:', error.message);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/getEvents`,
          {
            pageLimit,
            pageNumber: currPage,
          }
        );
        const data = response.data;
        console.log(data);

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
  }, [currPage]);

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
