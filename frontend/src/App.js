import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import React, { use, useEffect, useState } from 'react'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import RefreshHandler from './RefreshHandler';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }
  return (
    <div className="App">
      <h1>Full Stack Mren APPP</h1>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {/* <Route path="/" element={<home />} /> */}
        if (localStorage.getItem('token')) {
          <Route path="/" element={<Navigate to="/Home" />} />
        } else {
          <Route path="/" element={<Navigate to="/Login" />} />
        }

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        {/* <Route element={<PrivateRoute element={<Home />} />} /> */}
        {/* <Route path="/Home" element={<Home />} /> */}
      </Routes>
    </div>
  );
}

export default App;
