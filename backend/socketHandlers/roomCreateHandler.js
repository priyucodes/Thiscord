const serverStore = require('../serverStore');
const roomsUpdates = require('./updates/rooms');
const roomCreateHandler = socket => {
  console.log('Room creator');
  const userId = socket.user.userId;
  const socketId = socket.id;

  const roomDetails = serverStore.addNewActiveRoom(userId, socketId);
  socket.emit('room-create', {
    roomDetails,
  });

  roomsUpdates.updateRooms();
};

module.exports = roomCreateHandler;
