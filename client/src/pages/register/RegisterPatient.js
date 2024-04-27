import React from 'react';
// @ts-ignore
import logo from '../startNow/images/logo.svg';
// @ts-ignore
import dots from '../startNow/images/dots-two.png';
// @ts-ignore
import qrcode from '../startNow/images/qr-code.png';
// @ts-ignore
import googleplay from '../startNow/images/googleplay.png';
// @ts-ignore
import appstore from '../startNow/images/appstore.png';
import '../startNow/style/style.css';

const RegisterPatient = () => {
  return (
    <div className="wrapper">
      <div className="left-section">
        <div className="left-section-content">
          <img src={logo} className="logo" alt="logo" />
          <div className="header">Better healthcare starts here</div>
          <div className="subtext">
            Securely transfer health data and medical records between physicians and patients.
          </div>
          <div className="dots-container">
            <img src={dots} className="logo" alt="dots" />
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className="right-section-content">
          <h2 style={{ marginBottom: '25px', color: '#111827' }}>Register as a patient</h2>
          <div className="patient-subtext">
            Please access the Medisync mobile app to sign up as a patient. You'll need the Expo Go App installed on your
            mobile device.
          </div>
          <div className="qr-wrapper">
            <img src={qrcode} alt="QRCode" width="180" />
          </div>
          <div className="store-wrapper">
            <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_CA&gl=US" target="new">
              <img src={googleplay} alt="QRCode" width="180" />
            </a>
            <br />
            <a href="https://apps.apple.com/us/app/expo-go/id982107779" target="new">
              <img src={appstore} alt="QRCode" width="180" style={{ marginTop: '5px' }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPatient;
