import React from 'react';
import Button from '@mui/material/Button';
import StSignInStartNowButtons from './signInStartNowButtons/StSignInStartNowButtons';

const SignInStartNowButtons = () => {
  return (
    <StSignInStartNowButtons>
      <Button variant="outlined">Sign In</Button>
      <Button variant="contained">Start Now</Button>
    </StSignInStartNowButtons>
  );
};

export default SignInStartNowButtons;
