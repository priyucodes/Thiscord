import React from 'react';
import { styled } from '@mui/system';
import Avatar from '../../../shared/components/Avatar';
import { Typography } from '@mui/material';

const MainContainer = styled('div')({
  width: '97%',
  display: 'flex',
  marginTop: '10px',
});

const AvatarContainer = styled('div')({
  width: '4.375rem',
});

const MessageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const MessageContent = styled('div')({
  color: '#DCDDDE',
});
const SameAuthorMessageConent = styled('div')({
  color: '#DCDDDE',
  width: '97%',
});
const SameAuthorMessageText = styled('span')({
  marginLeft: '4.375rem',
});

const Message = ({ content, sameAuthor, username, date, sameDay }) => {
  if (sameAuthor && sameDay) {
    return (
      <SameAuthorMessageConent>
        <SameAuthorMessageText>{content}</SameAuthorMessageText>
      </SameAuthorMessageConent>
    );
  }

  return (
    <MainContainer>
      <AvatarContainer>
        <Avatar username={username} />
      </AvatarContainer>
      <MessageContainer>
        <Typography style={{ fontSize: '16px', color: 'white' }}>
          {username}{' '}
          <span style={{ fontSize: '12px', color: '#72767d' }}>{date}</span>
        </Typography>
        <MessageContent>{content}</MessageContent>
      </MessageContainer>
    </MainContainer>
  );
};

export default Message;