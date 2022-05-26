import { Button, Tooltip } from '@mui/material';
import React from 'react';
import Avatar from '../../shared/components/Avatar';
import * as roomHandler from '../../realtimeCommunication/roomHandler';
const ActiveRoomButton = ({
  roomId,
  creatorUsername,
  joinedParticipants,
  isUserInRoom,
}) => {
  const handleJoinActiveRoom = () => {
    if (joinedParticipants < 4) {
      roomHandler.joinRoom(roomId);
    }
  };

  const activeRoomButtonDisabled = joinedParticipants > 3;
  const roomTitle = `Creator: ${creatorUsername},
  Connected: ${joinedParticipants}`;
  return (
    <Tooltip title={roomTitle}>
      <div>
        <Button
          style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '1rem',
            margin: 0,
            padding: 0,
            minWidth: 0,
            marginTop: '10px',
            color: '#fff',
            backgroundColor: '#5865F2',
          }}
          disabled={activeRoomButtonDisabled || isUserInRoom}
          onClick={handleJoinActiveRoom}
        >
          <Avatar username={creatorUsername} />
        </Button>
      </div>
    </Tooltip>
  );
};

export default ActiveRoomButton;
