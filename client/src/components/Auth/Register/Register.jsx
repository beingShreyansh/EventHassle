import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import './Register.css';

import { Link, useNavigate } from 'react-router-dom';
import passwordValidations from '../../../validations/passwordValidation';


function Login() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [passwordValidationResult, setPasswordValidationResult] = useState('');
  // const [emailValidationResult, setEmailValidationResult] = useState('');
  const [formValidation, setFormValidation] = useState(false);
  const navigate = useNavigate();

  const validator = () => {
    const validPasswordString = passwordValidations.validatePassword(
      formData.password
    );
    if (validPasswordString === true) {
      setFormValidation(true);
      setPasswordValidationResult(false);
    } else setPasswordValidationResult(validPasswordString);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (formValidation) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, formData);
        if (response.status === 200) {
          toast.success(`Registered Successfully!`);
          navigate('/login');
        }
      } catch (error) {
        toast.error(`Email already Registered!`);
        console.error('Error during login:', error);
      }
    }
    if (
      formData.name === '' ||
      formData.email === '' ||
      formData.password === ''
    )
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
                type="text"
                name="name"
                placeholder="john Doe"
                value={formData.name}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="wrap-input validate-input">
              <input
                className="input100"
                type="email"
                name="email"
                placeholder="john@gmail.com"
                value={formData.email}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="wrap-input validate-input">
              {passwordValidationResult && (
                <font color="white">{passwordValidationResult}</font>
              )}
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
              <button
                className="btn login-btn"
                onClick={(e) => handleRegister(e)}
              >
                Register
              </button>
            </div>
            <div className="text-center p-t-115">
              <span className="txt1">Don't have an account? </span>{' '}
              <Link to="/login" className="txt2">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
