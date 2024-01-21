import React, { useState } from 'react';
import './AdminNavbar.css';
import Logo from '../../../assets/logo.png';
import { NavLink } from 'react-router-dom';

export default function AdminNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav id="admin-navbar" className={`${menuOpen ? 'open' : ''}`}>
        <div className="nav-wrapper">
          <div className="logo">
            <img width="150px" height="auto" src={Logo} alt="Logo" />
          </div>

          {/* Navigation links */}
          <div id="navLinks" className={`${menuOpen ? 'open' : ''}`}>
            <NavLink to="#home" className="navlink">
              Home
            </NavLink>
            <NavLink to="#services" className="navlink">
              Services
            </NavLink>
            <NavLink to="#about" className="navlink">
              About
            </NavLink>
            <NavLink to="#contact" className="navlink">
              Contact
            </NavLink>
          </div>

          {/* Hamburger menu button for mobile on the right side */}
          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          </div>
        </div>
      </nav>
    </>
  );
}
