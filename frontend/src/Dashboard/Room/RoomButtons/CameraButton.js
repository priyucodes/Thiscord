import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

const CameraButton = ({ localStream }) => {
  const [isVideoEnable, setIsVideoEnable] = useState(true);

  const toggleCameraHandler = () => {
    localStream.getVideoTracks()[0].enabled = !isVideoEnable;
    setIsVideoEnable(!isVideoEnable);
  };
  return (
    <IconButton style={{ color: 'white' }} onClick={toggleCameraHandler}>
      {isVideoEnable ? <VideocamIcon /> : <VideocamOffIcon />}
    </IconButton>
  );
};

export default CameraButton;
