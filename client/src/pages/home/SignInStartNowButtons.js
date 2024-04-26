import React from 'react';
import Button from '@mui/material/Button';
import StSignInStartNowButtons from './signInStartNowButtons/StSignInStartNowButtons';
import './style/style.css';

const SignInStartNowButtons = () => {
  return (
    <StSignInStartNowButtons>
      <Button className="button secondary" href="/signin">
        Sign In
      </Button>
      <Button className="button primary" href="/getstart">
        Start Now
      </Button>
    </StSignInStartNowButtons>
  );
};

export default SignInStartNowButtons;
