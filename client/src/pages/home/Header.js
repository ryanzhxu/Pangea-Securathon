import React from 'react';
import Navbar from './Navbar';
import StHeader from './header/StHeader';
import SignInStartNowButtons from './SignInStartNowButtons';

const Header = () => {
  return (
    <StHeader>
      <Navbar />
      <SignInStartNowButtons />
    </StHeader>
  );
};

export default Header;
