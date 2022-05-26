const serverStore = require('../serverStore');
const roomsUpdates = require('./updates/rooms');

const roomLeaveHandler = (socket, data) => {
  const { roomId } = data;
  const activeRoom = serverStore.getActiveRoom(roomId);
  if (activeRoom) {
    serverStore.leaveActiveRoom(roomId, socket.id);
    // Sending other users info about some other user leaving

    // Checking If room still exists
    const updatedActiveRoom = serverStore.getActiveRoom(roomId);
    if (updatedActiveRoom) {
      updatedActiveRoom.participants.forEach(participant => {
        socket.to(participant.socketId).emit('room-participant-left', {
          // User left
          connUserSocketId: socket.id,
        });
      });
    }

    // Update Room
    roomsUpdates.updateRooms();
  }
};

module.exports = roomLeaveHandler;
