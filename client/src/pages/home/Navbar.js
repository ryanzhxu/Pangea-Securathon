import React from 'react';
import StNavbar from './navbar/StNavbar';
// @ts-ignore
import logo from './images/medisync-logo.svg';

const Navbar = () => {
  return (
    <StNavbar>
      <a href="/">
        <img src={logo} alt="MediSync" />
      </a>
      <h3>
        <a href="/physicians">For Physicians</a>
      </h3>
      <h3>
        <a href="/patients">For Patients</a>
      </h3>
      <h3>
        <a href="/about">About</a>
      </h3>
    </StNavbar>
  );
};

export default Navbar;
