// AddEventForm.js
import React, { useState } from 'react';
import './AddMovie.css';
import AdminNavbar from '../../AdminNavbar/AdminNavbar';
import AdminSidebar from '../../AdminSidebar/AdminSidebar';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddMovie = () => {
  const [movieData, setMovieData] = useState({
    name: '',
    releaseDate: '',
    poster: '',
    cast: [''], // Initialize with an empty string
    genre: [''],
    bio: '',
  });

  const handleAddAttendee = () => {
    setMovieData((prevData) => ({
      ...prevData,
      cast: [...prevData.cast, ''],
    }));
  };

  const handleRemoveAttendee = (index) => {
    const updatedAttendees = [...movieData.cast];
    updatedAttendees.splice(index, 1);
    setMovieData((prevData) => ({
      ...prevData,
      cast: updatedAttendees,
    }));
  };

  const handleArtistChange = (index, value) => {
    const updatedAttendees = [...movieData.cast];
    updatedAttendees[index] = value;
    setMovieData((prevData) => ({
      ...prevData,
      cast: updatedAttendees,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/addMovie`,
        movieData,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.msg === 'success') {
        toast.success('Event Added Successfully');
        setMovieData({
          name: '',
          releaseDate: '',
          poster: '',
          cast: [''], // Initialize with an empty string
          genre: [''],
          bio: '',
        });
      }
    } catch (error) {}
    console.log('Form submitted!', movieData);
  };
  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <div className="event-form-container">
        <form className="event-form">
          <div className="grid-container">
            <div className="left-column">
              <div className="form-row">
                <label className="form-label">Name:</label>

                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={movieData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <label className="form-label">Date of Release: </label>
                <input
                  type="date"
                  name="releaseDate"
                  className="form-input"
                  value={movieData.releaseDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <label className="form-label">Artist:</label>
                {movieData.cast.map((attendee, index) => (
                  <div key={index} className="attendee-input-row ">
                    <div
                      className="add-remove-btn btn"
                      onClick={handleAddAttendee}
                    >
                      +
                    </div>
                    <input
                      type="text"
                      className="form-input artist-input"
                      value={attendee}
                      onChange={(e) =>
                        handleArtistChange(index, e.target.value)
                      }
                      placeholder={`Attendee ${index + 1}`}
                      required
                    />
                    {movieData.cast.length > 1 && (
                      <div
                        className="add-remove-btn  btn"
                        onClick={() => handleRemoveAttendee(index)}
                      >
                        -
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="form-row">
                <label className="form-label">Poster URL:</label>
                <input
                  type="text"
                  name="poster"
                  className="form-input"
                  value={movieData.poster}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="right-column">
              <div className="form-row artist-container">
                <label className="form-label">Cast:</label>
                {movieData.cast.map((attendee, index) => (
                  <div key={index} className="attendee-input-row ">
                    <div
                      className="add-remove-btn btn"
                      onClick={handleAddAttendee}
                    >
                      +
                    </div>
                    <input
                      type="text"
                      className="form-input artist-input"
                      value={attendee}
                      onChange={(e) =>
                        handleArtistChange(index, e.target.value)
                      }
                      placeholder={`Cast ${index + 1}`}
                      required
                    />
                    {movieData.cast.length > 1 && (
                      <div
                        className="add-remove-btn  btn"
                        onClick={() => handleRemoveAttendee(index)}
                      >
                        -
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="form-row">
                <label className="form-label">Description:</label>
                <input
                  name="bio"
                  className="form-input description-input"
                  value={movieData.bio}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <label className="form-label">Genre:</label>
                <input
                  type="text"
                  name="category"
                  className="form-input"
                  value={movieData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="btn-container">
            <button
              className="btn submit-btn"
              onClick={(e) => handleAddEvent(e)}
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddMovie;
