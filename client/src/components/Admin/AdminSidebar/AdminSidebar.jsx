// AdminSidebar.js

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`toggle-button ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        ☰
      </div>

      <div id="sidebar" className={isOpen ? 'open' : ''}>
        <div className="sidebar-section">
          <h3>Movies</h3>
          <ul>
            <li>
              <NavLink to="/admin/add-movie">Add Movie</NavLink>
            </li>
            <li>
              <NavLink to="/admin/delete-movie">Delete Movie</NavLink>
            </li>
            <li>
              <NavLink to="/admin/update-movie">Update Movie</NavLink>
            </li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>Events</h3>
          <ul>
            <li>
              <NavLink to="/admin/add-event">Add Event</NavLink>
            </li>
            <li>
              <NavLink to="/admin/delete-event">Delete Event</NavLink>
            </li>
            <li>
              <NavLink to="/admin/update-event">Update Event</NavLink>
            </li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>Users</h3>
          <ul>
            <li>
              <NavLink to="/admin/manage-users">Manage Users</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
