const User = require('../../models/userModel');
const FriendInvitation = require('../../models/friendInvitationModel');
const serverStore = require('../../serverStore');

const updateFriendsPendingInvitations = async userId => {
  try {
    // Active connections of specific userId
    const receiverList = serverStore.getActiveConnections(userId);
    if (!receiverList) return;
    // if (receiverList.legnth > 0) {};
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate('senderId', '_id username mail');
    // instead of obejctId we will get the data of that id(user)

    const io = serverStore.getSocketServerInstance();

    receiverList.forEach(receiverSocketId => {
      io.to(receiverSocketId).emit('friends-invitations', {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const updateFriends = async userId => {
  try {
    // Active Connections of specific id(online users)
    const receiverList = serverStore.getActiveConnections(userId);
    if (receiverList.length > 0) {
      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
        'friends',
        '_id username mail'
      );

      if (user) {
        const friendsList = user.friends.map(f => {
          return {
            id: f._id,
            mail: f.mail,
            username: f.username,
          };
        });

        const io = serverStore.getSocketServerInstance();

        receiverList.forEach(receiverSocketId => {
          io.to(receiverSocketId).emit('friends-list', {
            friends: friendsList ? friendsList : [],
          });
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  updateFriendsPendingInvitations,
  updateFriends,
};
