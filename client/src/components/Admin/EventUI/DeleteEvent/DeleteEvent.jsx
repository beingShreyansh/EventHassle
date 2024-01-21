// DeleteEventForm.js
import React, { useEffect, useState } from 'react';
import './DeleteEvent.css'; // Create a corresponding CSS file
import AdminNavbar from '../../AdminNavbar/AdminNavbar';
import AdminSidebar from '../../AdminSidebar/AdminSidebar';
import toast from 'react-hot-toast';
import axios from 'axios';

import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import MoviePoster from '../../../components/MoviePoster/MoviePoster';

const pageLimit = 10;
const DeleteEvent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/getEvents`,
        { pageLimit, page: 1 }
      );
      setEvents(data.events);
    };
    fetchEvent();
  }, [events]);

  const handleDeleteEvent = async (title) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/admin/deleteEvent/${title}`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.msg === 'success') {
        toast.success('Event Deleted Successfully');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <div className="event-form-container">
        <div className="event-form">
          {events.map((event, index) => (
            <div
              className="event-name-box"
              key={index}
              onClick={(e) => handleDeleteEvent(event.title)}
            >
              <div className="event-name-poster">
                <MoviePoster poster={event.poster} width={'50px'} />
                <div className="event-name">{event.title}</div>
              </div>
              <div
                className="event-deleteicon"
                onClick={(e) => handleDeleteEvent(event.title)}
              >
                <DeleteOutlineRoundedIcon sx={{ fontSize: 20 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DeleteEvent;
