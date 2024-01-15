import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home, Login, NoPage, Register } from './components';
// import ProtectedRoute from './ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout Childeren={Home} />,
    errorElement: <NoPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  // {
  //   element: <ProtectedRoute />,
  //   errorElement: <NoPage />,
  //   children: [
  //     {
  //       path: '/',
  //       element: <Home />,
  //     },
  //   ],
  // },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
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
    />
    <RouterProvider router={router} />
  </React.StrictMode>
);
