import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Layout = ({Childeren}) => {
  return (
    <>
      <Navbar />
      <Childeren />
      <Footer />
    </>
  );
};

export default Layout;
