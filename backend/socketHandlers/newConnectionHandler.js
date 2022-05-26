const serverStore = require('../serverStore');
const friendsUpdate = require('../socketHandlers/updates/friends');
const roomsUpdates = require('./updates/rooms');

const newConnectionHandler = async (socket, _io) => {
  const userDetails = socket.user;

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  // Update Pending Invitation list
  friendsUpdate.updateFriendsPendingInvitations(userDetails.userId);

  // Update Friends List
  friendsUpdate.updateFriends(userDetails.userId);

  // Initial Active Room update
  setTimeout(() => {
    roomsUpdates.updateRooms(socket.id);
  }, [500]);
};

module.exports = newConnectionHandler;
