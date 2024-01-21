// DeleteMovie.js
import React, { useEffect, useState } from 'react';
import './DeleteMovie.css'; // Make sure the file name matches
import AdminNavbar from '../../AdminNavbar/AdminNavbar';
import AdminSidebar from '../../AdminSidebar/AdminSidebar';
import toast from 'react-hot-toast';
import axios from 'axios';

import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import MoviePoster from '../../../components/MoviePoster/MoviePoster';
import DeleteMovieModal from './DeleteMovieModal';

const pageLimit = 10;
const DeleteMovie = () => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/getMovies`,
          { pageLimit, page: 1 }
        );
        setMovies(data.movies);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);

  const handleDeleteMovie = async (title) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/admin/deleteMovie/${title}`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.msg === 'success') {
        toast.success('Movie Deleted Successfully');
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <div className="event-form-container">
        <div className="event-form">
          {movies.map((movie, index) => (
            <div
              className="event-name-box"
              key={index}
              onClick={() => openModal(movie)}
            >
              <div className="event-name-poster">
                <MoviePoster poster={movie.poster} width={'50px'} />
                <div className="event-name">{movie.name}</div>
              </div>
              <div
                className="event-deleteicon"
                onClick={() => openModal(movie)}
              >
                <DeleteOutlineRoundedIcon sx={{ fontSize: 20 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <DeleteMovieModal
          setIsModalOpen={setIsModalOpen}
          handleDeleteMovie={handleDeleteMovie}
          movie={selectedMovie}
        />
      )}
    </>
  );
};

export default DeleteMovie;
