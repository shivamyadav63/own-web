import React from 'react';
import Navbar from './navbar';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Home from './pages/Home.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/Signup.jsx';
import { url } from "./config";


const App = () => {
  const location = useLocation();
  console.log(url);

  return (
    <div>
     <Navbar />
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/home" />} />
        {/* Pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
