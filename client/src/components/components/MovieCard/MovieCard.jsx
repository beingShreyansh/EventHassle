import React from 'react';
import MoviePoster from '../MoviePoster/MoviePoster';
import Typography from '@mui/material/Typography';

import './MovieCard.css';

const MovieCard = ({ name, poster, genre }) => {
  return (
    <div className="movieCard">
      <MoviePoster poster={poster} />
      <Typography
        textAlign="center"
        sx={{
          mr: 2,
          flexGrow: 1,
          fontFamily: 'Roboto, sans-serif', // Use Roboto font
          fontWeight: 600,
          color: 'inherit',
        }}
      >
        {name}
      </Typography>
      <span className="genres">
        {genre.map((genres, index) => (
          <span className="each-genre" key={index}>
            {genres}
          </span>
        ))}
      </span>
    </div>
  );
};

export default MovieCard;
