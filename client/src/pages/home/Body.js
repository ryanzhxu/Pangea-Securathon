import React from 'react';
import StBody from './body/StBody';
import { Button } from '@mui/material';
import './style/style.css';
// @ts-ignore
import ellipse from './images/ellipse.svg';
// @ts-ignore
import dashboard from './images/dashboard.svg';

const Body = () => {
  return (
    <StBody>
      <div style={{ textAlign: 'left', marginTop: '120px' }}>
        <div className="hero">
          Health metrics <br />
          reimagined
        </div>
        <div className="hero-sub-text">
          A secure data sharing platform that connects patients and <br />
          physicians, giving them a clearer picture of your medical history.
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button className="button primary" href="/getstart">
            Start Now
          </Button>
          <Button className="button">How it works</Button>
        </div>
      </div>
    </StBody>
  );
};

export default Body;
