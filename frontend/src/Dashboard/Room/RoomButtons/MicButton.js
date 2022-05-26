import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
const MicButton = ({ localStream }) => {
  const [isMicEnable, setIsMicEnable] = useState(true);

  const toggleMicHandler = () => {
    localStream.getAudioTracks()[0].enabled = !isMicEnable;
    setIsMicEnable(!isMicEnable);
  };
  return (
    <IconButton style={{ color: 'white' }} onClick={toggleMicHandler}>
      {isMicEnable ? <MicIcon /> : <MicOffIcon />}
    </IconButton>
  );
};

export default MicButton;
