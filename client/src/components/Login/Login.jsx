import React, { useState } from 'react';
import axios from 'axios';

import './Login.css';

import { Link, useNavigate } from 'react-router-dom';

const apiURL = 'http://localhost:3001';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiURL}/auth/login`, formData);
      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.accessToken);
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-form">
            <span className="login100-form-title p-b-26">Welcome</span>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="email"
                name="email"
                placeholder="john@gmail.com"
                value={formData.email}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="************"
                value={formData.password}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="btn-container">
              <button className="btn login-btn" onClick={(e) => handleLogin(e)}>
                Login
              </button>
            </div>
            <div className="text-center p-t-115">
              <span className="txt1">Don't have an account? </span>
              <Link to="/register" className="txt2">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
