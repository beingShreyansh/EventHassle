import React, { useState } from 'react';
import axios from 'axios';

import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import passwordValidations from '../../../validations/passwordValidation';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

function Login() {
  const navigate = useNavigate();
  const [formValidation, setFormValidation] = useState(false);

  // const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validator = () => {
    const validPasswordString = passwordValidations.validatePassword(
      formData.password
    );
    const validEmailString = passwordValidations.validateEmail(formData.email);
    if (validPasswordString === true && validEmailString === true) {
      setFormValidation(true);
    } else setPasswordError(validPasswordString);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (formValidation) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/login`,
          formData
        );
        if (response.status === 200) {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('role', response.data.role);
          navigate('/');
        }
      } catch (error) {
        if (error.response.status === 402) {
          toast.error("User doesn't Exist");
        }
        if (error.response.status === 401) {
          toast.error(error.response.data.error);
        }
      }
    }
    if (formData.email === '' || formData.password === '')
      toast.error('Field missing');
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-form">
            <span className="login100-form-title p-b-26">Welcome</span>
            <div className="wrap-input validate-input">
              <input
                className="input100"
                type="email"
                name="email"
                placeholder="john@gmail.com"
                value={formData.email}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <EmailOutlinedIcon style={{ color: 'grey', marginTop: '10px' }} />
            </div>

            {passwordError && (
              <span style={{ color: '#FF4B4B  ', fontSize: '10px' }}>
                {passwordError}
              </span>
            )}
            <div className="wrap-input validate-input">
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="************"
                value={formData.password}
                onChange={(e) => {
                  handleChange(e);
                  validator();
                }}
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
