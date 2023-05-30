import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import  Header from './Header';
import HomePage from './HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='' element={<HomePage />} />
      <Route path='/:role/:login' element={<App />} />
    </Routes>
  </BrowserRouter>
);
