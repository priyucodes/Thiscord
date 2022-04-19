import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const BoxWrapper = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#5865F2',
});

const AuthBox = props => {
  return (
    <BoxWrapper>
      {/* sx:- style */}
      <Box
        sx={{
          width: 700,
          minHeight: 400,
          bgcolor: '#36393f',
          borderRadius: '5px',
          boxShadow: '0 3px 10px 0 rgba(0, 0, 0 20%)',
          // boxShadow: '0 3px 10px 0 rgba(0 0 0 / 20%)',
          flexDirection: 'column',
          padding: '1.6rem', //25px around
        }}
      >
        {props.children}
      </Box>
    </BoxWrapper>
  );
};

export default AuthBox;
