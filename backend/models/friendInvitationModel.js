const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const friendInvitationSchema = new Schema({
  senderId: {
    // Helps get userDetails for the user from the reference
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('FriendInvitation', friendInvitationSchema);
