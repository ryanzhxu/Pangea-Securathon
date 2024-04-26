import React from 'react';
import StNavbar from './navbar/StNavbar';
import './style/style.css';
// @ts-ignore
import logo from './images/medisync-logo.svg';

const Navbar = () => {
  return (
    <StNavbar>
      <a href="/">
        <img src={logo} alt="MediSync" style={{ width: 200, position: 'relative', top: '-3px' }} />
      </a>
      <div>
        <a href="/physicians" className="navbar-link">
          For Physicians
        </a>
      </div>
      <div>
        <a href="/patients" className="navbar-link">
          For Patients
        </a>
      </div>
      <div>
        <a href="/about" className="navbar-link">
          About
        </a>
      </div>
    </StNavbar>
  );
};

export default Navbar;
