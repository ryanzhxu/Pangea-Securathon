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
      <div style={{ textAlign: 'left', marginBottom: '120px' }}>
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
      <div style={{ margin: 'auto', alignItems: 'center' }}>
        <img src={ellipse} alt="" style={{ position: 'absolute', zIndex: '-1', width: '450px', height: '450px' }} />
        <img src={dashboard} alt="" style={{ width: '600px', height: '600px' }} />
      </div>
    </StBody>
  );
};

export default Body;
