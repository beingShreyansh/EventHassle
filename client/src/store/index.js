// index.js

const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken');
};

const loggedInRole = () => {
  return localStorage.getItem('role');
};

const getUserInfo = () => {
  return JSON.parse(localStorage.getItem('userInfo')) || null;
};

const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('role');
};

export { isAuthenticated, getUserInfo, logout, loggedInRole };
