// src/components/SignInWithImage.js
import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  SignInContainer,
  SignInBox,
  StyledAvatar,
  StyledButton,
  StyledTypography,
} from './authentication/styleComponent/StSignin';
import { StWelcomeImage } from './authentication/styleComponent/StWelcomeImage';
// @ts-ignore
import welcomeImage from './authentication/images/welcome.svg';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        const { refresh_token, access_token, user } = data;

        // Store tokens for session management
        localStorage.setItem('access_token', access_token.token);
        localStorage.setItem('refresh_token', refresh_token.token);

        // Redirect to a protected route or update UI to reflect sign-in success
        window.location.href = '/'; // Redirect to dashboard or home page
      }
    } catch (error) {
      console.log('invalid credentials');
    }
  };

  return (
    <SignInContainer>
      {/* Left Side with SVG Image */}
      <Grid item xs={12} md={7}>
        <StWelcomeImage src={welcomeImage} alt="Join Medisync!" />
      </Grid>

      {/* Right Side with Sign-In Form */}
      <Grid item xs={12} md={5}>
        <SignInBox>
          <StyledAvatar>
            <LockOutlinedIcon />
          </StyledAvatar>
          <StyledTypography variant="h5">Sign In</StyledTypography>
          <form onSubmit={handleSignIn}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={email}
              required
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <StyledButton fullWidth variant="contained" color="primary" type="submit">
              Sign In
            </StyledButton>
          </form>
        </SignInBox>
      </Grid>
    </SignInContainer>
  );
};

export default SignIn;
