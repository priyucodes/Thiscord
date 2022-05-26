import React from 'react';
import { IconButton } from '@mui/material';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import * as webRTCHandler from '../../../realtimeCommunication/webRTCHandler';
const constraints = {
  audio: true,
  video: true,
};

const ScreenShareButton = ({
  localStream,
  screenSharingStream,
  setScreenSharingStream,
  isScreenSharingActive,
}) => {
  const screenShareToggleHandler = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (err) {
        console.error('Error occured while screen sharing');
      }
      if (stream) {
        setScreenSharingStream(stream);
        webRTCHandler.switchOutgoingTracks(stream);
      }
    } else {
      console.log('hsihwsisw');
      webRTCHandler.switchOutgoingTracks(localStream);
      screenSharingStream.getTracks().forEach(t => t.stop());
      setScreenSharingStream(null);
    }
  };
  return (
    <IconButton style={{ color: 'white' }} onClick={screenShareToggleHandler}>
      {isScreenSharingActive ? <StopScreenShareIcon /> : <ScreenShareIcon />}
    </IconButton>
  );
};

export default ScreenShareButton;
