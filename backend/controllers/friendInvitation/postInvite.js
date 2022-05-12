const User = require('../../models/userModel');
const FriendInvitation = require('../../models/friendInvitationModel');
const friendsUpdates = require('../../socketHandlers/updates/friends');

const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;
  const { userId, mail } = req.user;

  // Check if friend that we would like to invite is not a user

  // Check if we are not inviting ourself
  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
    return res
      .status(409)
      .send('Sorry, You cannot become tomodachi/friend with yourself');
  }

  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase(),
  });

  if (!targetUser) {
    return res
      .status(404)
      .send(
        `Friend of ${targetMailAddress} has not been found. Please make sure the user exist`
      );
  }

  // Invitation has already been sent
  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });

  if (invitationAlreadyReceived) {
    return res.status(409).send(`Invitation has been already sent!`);
  }

  // If invited person is already our friend
  const usersAlreadyFriends = targetUser.friends.find(
    friendId => friendId.toString() === userId.toString()
  );
  if (usersAlreadyFriends) {
    return res
      .status(409)
      .send(`Friend already exist. Please check your friend list.`);
  }

  // Create new invitation in DB
  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  // Update Friend invitation if other user is online

  // Send pending invitation update to specific user
  friendsUpdates.updateFriendsPendingInvitations(targetUser._id.toString());
  return res.status(201).send(`Invitation has been sent`);
};

module.exports = postInvite;
