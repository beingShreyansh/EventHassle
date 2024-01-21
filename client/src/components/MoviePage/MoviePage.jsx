import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MoviePoster from '../components/MoviePoster/MoviePoster';
import './MoviePage.css'; // Import a CSS file for styling


const MoviePage = () => {
  const { name } = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getMovieByName/${name}`);
        const data = response.data;
        if (response.status === 200) {
          setMovie(data.movie);
        } else {
          console.error('Failed to fetch movies:', data.message);
        }
      } catch (error) {
        console.error('Error during fetch:', error.message);
      }
    };
    fetchMovie();
  }, [name]);

  return (
    <div className="movie-page-container">
      <h1 className="movie-title">{movie?.name}</h1>

      <div className="movie-poster-container">
        <MoviePoster poster={movie?.poster} width={'600px'} />
      </div>

      <div className="movie-info-container">
        <p className="release-date">
          Release Date: {movie?.releaseDate.slice(0, 10)}
        </p>
        <p className="genres">Genres: {movie?.genre.join(', ')}</p>
        <p className="description">{movie?.bio}</p>
      </div>
    </div>
  );
};

export default MoviePage;
