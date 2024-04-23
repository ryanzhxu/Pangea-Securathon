import React from 'react';
import StNavbar from './navbar/StNavbar';
import logo from './images/medisync-logo.svg';

const Navbar = () => {
  return (
    <StNavbar>
      <img src={logo} alt='MediSync' />
      <h3>
        <a href='google.ca'>For Physicians</a>
      </h3>
      <h3>
        <a href='google.ca'>For Physicians</a>
      </h3>
      <h3>
        <a href='google.ca'>For Physicians</a>
      </h3>{' '}
    </StNavbar>
  );
};

export default Navbar;
