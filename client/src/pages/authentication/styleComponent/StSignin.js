// src/components/SignInFormStyles.js
import styled from 'styled-components';
import { Box, Avatar, Button, Typography } from '@mui/material';

export const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const SignInBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  margin-right: 150px;
`;

export const StyledAvatar = styled(Avatar)`
  background-color: #1976d2; // MUI's primary blue color
  margin-bottom: 16px;
`;

export const StyledButton = styled(Button)`
  margin-top: 16px;
  background-color: #1976d2;
  &:hover {
    background-color: #1565c0;
  }
`;

export const StyledTypography = styled(Typography)`
  font-weight: bold;
  margin-bottom: 16px;
`;
