import React, { useState } from 'react';
// @ts-ignore
import logo from './startNow/images/logo.svg';
// @ts-ignore
import dots from './startNow/images/dots-one.png';
// @ts-ignore
import chevron from './startNow/images/chevron-right.png';
import { Button, FormControl, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './startNow/style/style.css';

const GetStart = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (_event, newValue) => {
    setSelectedValue((prevSelectedValue) => (prevSelectedValue === newValue ? newValue : newValue));
  };

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
        <div className="get-start-page-login" style={{ marginTop: 45, marginRight: 120, textAlign: 'right' }}>
          Already have an account?{' '}
          <a href="/signin" style={{ textDecoration: 'none', color: '#1565D8', fontWeight: 'bold' }}>
            Sign in
          </a>
        </div>
        <div style={{ textAlign: 'left', margin: '160px 120px' }}>
          <h2>Get started now</h2>
          <h4 style={{ color: 'grey', fontWeight: 'normal' }}>
            To begin, tell us what type of account you're registering.
          </h4>
          <div>
            <FormControl component="fieldset">
              <ToggleButtonGroup value={selectedValue} onChange={handleChange} orientation="vertical" exclusive>
                <ToggleButton value="physician" className="toggle-button">
                  <div>Physician </div>
                  <div className="button-subtext">
                    A licensed practitioner looking to manage patient data and documentation.
                  </div>
                </ToggleButton>
                <ToggleButton value="patient" className="toggle-button">
                  <div>Patient</div>
                  <div className="button-subtext">
                    An individual looking to share their health data with their provider or physician.
                  </div>
                </ToggleButton>
              </ToggleButtonGroup>
            </FormControl>
            <div className="button-container">
              <Button
                className="button primary"
                onClick={() => navigate(`/register/${selectedValue}`)}
                disabled={!selectedValue}
              >
                Continue <img src={chevron} className="chevron" alt="chevron" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStart;

