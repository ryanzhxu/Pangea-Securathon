import React, { useState } from 'react';
// @ts-ignore
import joinMediSync from './startNow/images/join-medisync.svg';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GetStart = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="get-start-page" style={{ display: 'flex' }}>
      <img src={joinMediSync} alt="Join Medisync!" />
      <div className="get-start-page-right-section">
        <div
          className="get-start-page-login"
          style={{ margin: 'auto auto 197px auto', textAlign: 'center', paddingTop: '45px' }}
        >
          Already have an account?{' '}
          <a href="/signin" style={{ textDecoration: 'none', color: '#1565D8', fontWeight: 'bold' }}>
            Sign in
          </a>
        </div>
        <div style={{ textAlign: 'left' }}>
          <h2>Get started now</h2>
          <h4 style={{ color: 'grey', fontWeight: 'normal' }}>
            To begin, tell us what type of account you're registering.
          </h4>
          <div>
            <FormControl component="fieldset">
              <RadioGroup aria-label="options" name="options" value={selectedValue} onChange={handleChange}>
                <FormControlLabel value="physician" control={<Radio />} label="Physician" />
                <FormControlLabel value="patient" control={<Radio />} label="Patient" />
              </RadioGroup>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/register/${selectedValue}`)}
              disabled={!selectedValue}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStart;

