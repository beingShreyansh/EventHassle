import React from 'react';
import './MoviePoster.css'
const MoviePoster = ({ poster, name, genre }) => {
  return (
    <div className= "movies-container" >
      <img src={poster} alt="poster" className="poster-img" loading="lazy" />
    </div >
  );
};

export default MoviePoster;
