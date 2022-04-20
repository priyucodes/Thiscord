import React from 'react';
import { styled } from '@mui/system';
import FriendsListItem from './FriendsListItem';

const DUMMY_FRIENDS = [
  {
    id: 1,
    username: 'Penny',
    isOnline: true,
  },
  {
    id: 2,
    username: 'Annie',
    isOnline: false,
  },
  {
    id: 3,
    username: 'Chapra',
    isOnline: false,
  },
];

const MainContainer = styled('div')({
  flexGrow: 1,
  width: '100%',
});

const FriendsList = () => {
  return (
    <MainContainer>
      {DUMMY_FRIENDS.map(f => {
        return (
          <FriendsListItem
            username={f.username}
            id={f.id}
            key={f.id}
            isOnline={f.isOnline}
          />
        );
      })}
    </MainContainer>
  );
};

export default FriendsList;
