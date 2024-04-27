import React, { useState } from 'react';
import { FormControl, FormGroup, Button, TextField } from '@mui/material';
// @ts-ignore
import logo from '../startNow/images/logo.svg';
// @ts-ignore
import dots from '../startNow/images/dots-two.png';
import SERVER_URL from '../../config';
import '../startNow/style/style.css';

const RegisterPatient = () => {
  return (
    <div className="wrapper">
      <div className="left-section">
        <div className="left-section-content">
          <img src={logo} className="logo" />
          <div className="header">Better healthcare starts here</div>
          <div className="subtext">
            Securely transfer health data and medical records between physicians and patients.
          </div>
          <div className="dots-container">
            <img src={dots} className="logo" />
          </div>
        </div>
      </div>
      <div className="right-section">
        <div style={{ textAlign: 'left', margin: '180px 120px' }}>
          <h2 style={{ marginBottom: '25px', color: '#111827' }}>Register as a patient</h2>
          <div className="patient-subtext">Please access the Medisync mobile app to sign up as a patient.</div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPatient;
