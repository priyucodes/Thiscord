import React, { useState } from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { connect } from 'react-redux';
import Avatar from '../../../shared/components/Avatar';
import InvitationDecisionButton from './InvitationDecisionButton';
import { getActions } from '../../../store/actions/friendsActions';
const PendingInvitationsListItem = ({
  id,
  username,
  mail,
  acceptFriendInvitation = () => {},
  rejectFriendInvitation = () => {},
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const acceptInvitationHandler = () => {
    acceptFriendInvitation({ id });
    setButtonDisabled(true);
  };
  const rejectInvitationHandler = () => {
    rejectFriendInvitation({ id });
    setButtonDisabled(true);
  };
  return (
    <Tooltip title={mail}>
      <div style={{ width: '100%' }}>
        <Box
          sx={{
            width: '100%',
            height: '2.625rem',
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Avatar username={username} />
          <Typography
            sx={{
              marginLeft: '7px',
              fontWeight: 700,
              color: '#8e9297',
              flexGrow: 1,
            }}
            variant="subtitle1"
          >
            {username}
          </Typography>
          <InvitationDecisionButton
            disabled={buttonDisabled}
            acceptInvitationHandler={acceptInvitationHandler}
            rejectInvitationHandler={rejectInvitationHandler}
          />
        </Box>
      </div>
    </Tooltip>
  );
};

const mapActionsToProps = dispatch => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(PendingInvitationsListItem);
