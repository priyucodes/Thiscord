import React from 'react';
import { styled } from '@mui/system';
import PendingInvitationsListItem from './PendingInvitationsListItem';

const DUMMY_INVITATIONS = [
  {
    _id: 1,
    senderId: {
      username: 'Penny',
      mail: 'dummy@ad.com',
    },
  },
  {
    _id: 2,
    senderId: {
      username: 'annie',
      mail: 'annie@ad.com',
    },
  },
];

const MainContainer = styled('div')({
  width: '100%',
  height: '22%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'auto',
});
const PendingInvitationsList = () => {
  return (
    <MainContainer>
      {DUMMY_INVITATIONS.map(invitation => {
        return (
          <PendingInvitationsListItem
            key={invitation._id}
            id={invitation._id}
            username={
              invitation.senderId.username[0].toUpperCase() +
              invitation.senderId.username.slice(1).toLowerCase()
            }
            mail={invitation.senderId.mail}
          />
        );
      })}
    </MainContainer>
  );
};

export default PendingInvitationsList;
