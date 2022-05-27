import React from 'react';
import { styled } from '@mui/system';

const AvatarPreview = styled('div')({
  height: '2.625rem',
  width: '2.625rem',
  backgroundColor: '#5865f2',
  borderRadius: '42px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.25rem',
  fontWeight: 700,
  // marginLeft: '5px',
  color: '#fff',
});

const Avatar = ({ username, large }) => {
  return (
    <AvatarPreview style={large ? { height: '5rem', width: '5rem' } : {}}>
      {username.substring(0, 2)}
    </AvatarPreview>
  );
};

export default Avatar;
