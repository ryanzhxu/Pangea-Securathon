import React from 'react';
import StHome from './home/StHome';
import Header from './home/Header';
import Body from './home/Body';

// @ts-ignore
import silvertree from './home/images/bottom/silvertree.svg';
// @ts-ignore
import fitbit from './home/images/bottom/fitbit.svg';
// @ts-ignore
import applewatch from './home/images/bottom/applewatch.svg';
// @ts-ignore
import dexcom from './home/images/bottom/dexcom.svg';
// @ts-ignore
import garmin from './home/images/bottom/garmin.svg';

const Home = () => {
  return (
    <StHome>
      <Header />
      <Body />
      <div className="home-page-bottom-section">
        <div>
          <h2>Medisync pairs with popular wearable health trackers</h2>
          <div style={{ display: 'inline-flex', gap: '60px', alignItems: 'center' }}>
            <a href="https://www.silvertree.com">
              <img src={silvertree} alt="silvertree" />
            </a>
            <a href="https://www.fitbit.com">
              <img src={fitbit} alt="fitbit" />
            </a>
            <a href="https://www.apple.com">
              <img src={applewatch} alt="applewatch" />
            </a>
            <a href="https://www.dexcom.com">
              <img src={dexcom} alt="dexcom" />
            </a>
            <a href="https://www.garmin.com">
              <img src={garmin} alt="garmin" />
            </a>
          </div>
        </div>
      </div>
    </StHome>
  );
};

export default Home;
