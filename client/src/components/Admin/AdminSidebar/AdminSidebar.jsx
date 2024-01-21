// AdminSidebar.js

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`toggle-button ${isOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
      >
        ☰
      </div>

      <div id="sidebar" className={isOpen ? 'open' : ''}>
        <div className="sidebar-section">
          <h3 className="sidebar-section-head">Movies</h3>
          <ul>
            <li>
              <NavLink to="/admin/addMovie">Add Movie</NavLink>
            </li>
            <li>
              <NavLink to="/admin/deleteMovie">Delete Movie</NavLink>
            </li>
            <li>
              <NavLink to="/admin/updateMovie">Update Movie</NavLink>
            </li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3 className="sidebar-section-head">Events</h3>
          <ul>
            <li>
              <NavLink to="/admin/addEvent">Add Event</NavLink>
            </li>
            <li>
              <NavLink to="/admin/deleteEvent">Delete Event</NavLink>
            </li>
            <li>
              <NavLink to="/admin/updateEvent">Update Event</NavLink>
            </li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3 className="sidebar-section-head">Users</h3>
          <ul>
            <li>
              <NavLink to="/admin/managUsers">Manage Users</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
