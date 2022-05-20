import React from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Avatar from '../../../shared/components/Avatar';
import OnlineIndicator from './OnlineIndicator';

import { chatTypes, getActions } from '../../../store/actions/chatActions';

import { connect } from 'react-redux';
const FriendsListItem = ({ id, username, isOnline, setChosenChatDetails }) => {
  const chooseActiveChatHandler = () => {
    setChosenChatDetails({ id: id, name: username }, chatTypes.DIRECT);
  };
  return (
    <Button
      onClick={chooseActiveChatHandler}
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

const mapActionsToProps = dispatch => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(FriendsListItem);
