import io from 'socket.io-client';
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
} from '../store/actions/friendsActions';
import store from '../store/store';
let socket = null;

export const connectWithSocketServer = userDetails => {
  const jwtToken = userDetails.token;
  socket = io('http://localhost:5000', {
    auth: {
      token: jwtToken,
    },
  });

  socket.on('connect', () => {
    console.log('Successfully connected with socket.io server');
    console.log(socket.id);
  });

  socket.on('friends-invitations', data => {
    const { pendingInvitations } = data;
    // console.log(pendingInvitations);
    store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on('friends-list', data => {
    const { friends } = data;

    store.dispatch(setFriends(friends));
  });

  socket.on('online-users', data => {
    const { onlineUsers } = data;
    store.dispatch(setOnlineUsers(onlineUsers));
  });
};
