import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Input, FormHelperText, FormGroup, Button } from '@mui/material';
// @ts-ignore
import joinMediSync from '../startNow/images/join-medisync.svg';
import SERVER_URL from '../../config';

const Register = ({ isPhysician }) => {
  console.log('SERVER_URL: ', SERVER_URL);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${SERVER_URL}/physicians`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Physician added:', data);
      } else {
        console.error('Failed to add physician:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding physician:', error.message);
    }
  };

  return (
    <div className="get-start-page" style={{ display: 'flex' }}>
      <img src={joinMediSync} alt="Join Medisync!" style={{ flex: 1 }} />
      <div className="get-start-page-right-section" style={{ flex: 1 }}>
        <div style={{ textAlign: 'left', margin: '100px 120px' }}>
          <h2 style={{ marginBottom: '25px' }}>Register as a physician</h2>
          <form onSubmit={handleSubmit}>
            <FormGroup style={{ gap: '25px' }}>
              <FormControl>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input id="name" aria-describedby="name-helper-text" onChange={handleInputChange} />
                <FormHelperText id="name-helper-text">Enter your name</FormHelperText>
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input id="email" aria-describedby="email-helper-text" onChange={handleInputChange} />
                <FormHelperText id="email-helper-text">Enter your work email</FormHelperText>
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="phone">Phone number</InputLabel>
                <Input id="phone" aria-describedby="phone-helper-text" onChange={handleInputChange} />
                <FormHelperText id="phone-helper-text">Enter your phone number</FormHelperText>
              </FormControl>
            </FormGroup>
            <div style={{ textAlign: 'right', marginTop: '25px' }}>
              <Button variant="contained" color="primary" type="submit">
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  isPhysician: PropTypes.bool.isRequired,
};

export default Register;
