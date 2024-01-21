import React from 'react';
import './MoviePoster.css';
const MoviePoster = ({ poster, name, genre, width }) => {
  return (
    <div className="movies-container">
      <img
        src={poster}
        alt="poster"
        className="poster-img"
        loading="lazy"
        style={{ width }}
      />
    </div>
  );
};

export default MoviePoster;
