import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  Home,
  Login,
  NoPage,
  Register,
  MoviePage,
  EventPage,
} from './components';

import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import EventBookingPage from './components/EventPage/EventBookingPage';

// import ProtectedRoute from './ProtectedRoute';

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
  {
    path: '/movie/:name',
    element: <Layout Childeren={MoviePage} />,
  },

  {
    path: '/movie/booking/:name',
    element: <Layout Childeren={MoviePage} />,
  },
  {
    path: '/event/:name',
    element: <Layout Childeren={EventPage} />,
  },
  {
    path: '/event/booking/:name',
    element: <EventBookingPage />,
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
