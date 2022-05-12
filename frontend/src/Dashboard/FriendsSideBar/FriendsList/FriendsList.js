import React from 'react';
import { connect } from 'react-redux';
import { styled } from '@mui/system';
import FriendsListItem from './FriendsListItem';
const MainContainer = styled('div')({
  flexGrow: 1,
  width: '100%',
});
const checkOnlineUsers = (friends = [], onlineUsers = []) => {
  friends.forEach(f => {
    const isUserOnline = onlineUsers.find(user => user.userId === f.id);
    f.isOnline = isUserOnline ? true : false;
  });

  return friends;
};
const FriendsList = ({ friends, onlineUsers }) => {
  return (
    <MainContainer>
      {checkOnlineUsers(friends, onlineUsers).map(f => {
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
// Under the name in store.js we use friends name. so we get ccess to field which is in reducer.
const mapStoreStateToProps = ({ friends, onlineUsers }) => {
  return {
    ...friends,
  };
};
export default connect(mapStoreStateToProps)(FriendsList);
