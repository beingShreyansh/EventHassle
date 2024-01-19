import React, { useState } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import AdminSidebar from '../AdminSidebar/AdminSidebar';

const AdminDashboard = () => {
  //   let a = 0;
  const [a, setA] = useState(0);
  const handleClick = () => {
    setA(a + 1);
    setA(a + 1);
    setA(a + 1);
    setA(a + 1);
    setA(a + 1);

  };
  return (
    <div className="">
      <AdminNavbar />
      <AdminSidebar />
      <div class="content">
        <button onClick={handleClick}>click</button>
        value: {a}
      </div>
    </div>
  );
};

export default AdminDashboard;
