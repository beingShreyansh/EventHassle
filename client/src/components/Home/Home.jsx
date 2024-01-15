import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';

const apiURL = 'http://localhost:3001';

function Home() {
  const [movies, setMovies] = useState([]);

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

    fetchMovies();
  }, []);
  return (
    <div>
      <h2 className='recommended-movie-heading'>Receommended Movies</h2>
      <div className="movies-container">
        {movies.map((movie) => (
          <div key={movie._id}>
            <MovieCard
              name={movie.name}
              poster={movie.poster}
              genre={movie.genre}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
