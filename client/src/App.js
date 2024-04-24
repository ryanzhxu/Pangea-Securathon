import './App.css';
import React from 'react';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import GetStart from './pages/GetStart';
import Register from './pages/register/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getstart" element={<GetStart />} />
        <Route path="/register/physician" element={<Register isPhysician />} />
      </Routes>
    </div>
  );
}

export default App;
