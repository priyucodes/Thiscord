import React from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Avatar from '../../../shared/components/Avatar';
import OnlineIndicator from './OnlineIndicator';
const FriendsListItem = ({ id, username, isOnline }) => {
  return (
    <Button
      style={{
        width: '100%',
        height: '2.625rem',
        marginTop: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textTransform: 'none',
        color: '#000',
        position: 'relative',
      }}
    >
      <Avatar username={username} />
      <Typography
        style={{ marginLeft: '7px', fontWeight: 700, color: '#8e9297' }}
        variant="subtitle1"
        align="left"
      >
        {username}
      </Typography>
      {isOnline && <OnlineIndicator />}
    </Button>
  );
};

export default FriendsListItem;