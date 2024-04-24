import React from 'react';
import StBody from './body/StBody';
import { Button } from '@mui/material';
// @ts-ignore
import ellipse from './images/ellipse.svg';
// @ts-ignore
import dashboard from './images/dashboard.svg';

const Body = () => {
  return (
    <StBody>
      <div style={{ textAlign: 'left', marginBottom: '120px' }}>
        <h1 style={{ fontSize: '48px' }}>Health metrics reimagined</h1>
        <h4 style={{ color: 'grey' }}>
          A secure data sharing platform that connects patients and physicians, giving them a clearer picture of your
          medical history.
        </h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Button variant="contained">Start Now</Button>
          <Button variant="text">How it works</Button>
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
