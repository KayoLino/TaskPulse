import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login'; // Importe a página de Login
import Register from '../pages/Register/Register';
import HomePage from '../pages/HomePage/HomePage';

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Rota para a página Home */}
        <Route path="/login" element={<Login />} /> {/* Rota para a página Login */}
        <Route path="/register" element={<Register />} /> {/* Rota para a página Register */}
        <Route path="/HomePage/:id"
          element={
            <HomePage />
          }
        />
      </Routes>
    </main>
  );
};

export default Main;