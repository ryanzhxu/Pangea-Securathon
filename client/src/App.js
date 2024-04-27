import './App.css';
import React from 'react';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import GetStart from './pages/GetStart';
import SignIn from './pages/SignIn';
import Register from './pages/register/Register';
import RegisterPatient from './pages/register/RegisterPatient';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getstart" element={<GetStart />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register/physician" element={<Register isPhysician />} />
        <Route path="/register/patient" element={<RegisterPatient />} />
      </Routes>
    </div>
  );
}

export default App;
