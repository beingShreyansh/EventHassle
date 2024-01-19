import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Layout = ({ Children }) => {
  return (
    <>
      <Navbar />
      <Children />
      <Footer />
    </>
  );
};

export default Layout;
