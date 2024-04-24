import './App.css';
import React from 'react';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import GetStart from './pages/GetStart';
import SignIn from './pages/SignIn';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getstart" element={<GetStart />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
