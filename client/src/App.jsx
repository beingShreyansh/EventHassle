import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import NoPage from './components/NoPage/NoPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            theme: {
              primary: '#4aed88',
            },
          },
          error: {
            theme: {
              primary: 'red',
            },
          },
        }}
      ></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute Component={Home} />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
