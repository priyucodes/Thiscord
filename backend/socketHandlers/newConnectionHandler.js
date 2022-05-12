const serverStore = require('../serverStore');
const friendsUpdate = require('../socketHandlers/updates/friends');
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
};

module.exports = newConnectionHandler;
