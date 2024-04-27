import React, { useState } from 'react';
import { Button, Container, Divider, TextField } from '@mui/material';
import './home/style/style.css';
// @ts-ignore
import logo from './authentication/images/medisync-logo.svg';
import { Link } from 'react-router-dom';

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
    <div className="outer-wrapper">
      <Container maxWidth="xl">
        <div style={{ textAlign: 'left', paddingTop: '12px' }}>
          <Link to="/">
            <img src={logo} alt="logo" width="160" />
          </Link>
        </div>
        <div className="signin-container">
          <div className="signin-header">Welcome back to Medisync!</div>
          <div className="signin-subtext">Sign in below</div>
          <Divider variant="middle" />
          <form onSubmit={handleSignIn} style={{ marginTop: '20px' }}>
            <div className="form-field-container">
              <div className="label">Email Address</div>
              <TextField
                required
                id="email"
                name="email"
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="text-input"
                InputLabelProps={{ shrink: false }}
                sx={{
                  '& fieldset': { border: 'none' },
                  input: { color: '#ABAFB1', fontSize: '11pt' },
                }}
                margin="normal"
              />
            </div>
            <div className="form-field-container" style={{ marginTop: '12px' }}>
              <div className="label">Password</div>
              <TextField
                required
                id="password"
                name="password"
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="text-input"
                InputLabelProps={{ shrink: false }}
                sx={{
                  '& fieldset': { border: 'none' },
                  input: { color: '#ABAFB1', fontSize: '11pt' },
                }}
                margin="normal"
              />
            </div>
            <Button type="submit" className="signin-button">
              Sign In
            </Button>
          </form>
          <div className="footer-text">
            Don't have an account?{' '}
            <Link to="/getstart" style={{ color: '#1565D8', fontWeight: 500, textDecoration: 'none' }}>
              Register here
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;
