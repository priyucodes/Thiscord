import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as roomHandler from '../../../realtimeCommunication/roomHandler';

const CloseRoomButton = () => {
  const leaveRoomHandler = () => {
    roomHandler.leaveRoom();
  };
  return (
    <IconButton style={{ color: 'white' }} onClick={leaveRoomHandler}>
      <CloseIcon />
    </IconButton>
  );
};

export default CloseRoomButton;
