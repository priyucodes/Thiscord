const FriendInvitation = require('../../models/friendInvitationModel');
const User = require('../../models/userModel');
const friendsUpdates = require('../../socketHandlers/updates/friends');

const postAccept = async (req, res) => {
  try {
    const { id } = req.body;
    // console.log(req.body);
    const invitation = await FriendInvitation.findById(id);

    if (!invitation) {
      return res.status(404).send('Error occured. Please try again');
    }
    const { senderId, receiverId } = invitation;
    // console.log(invitation);
    // Add Friend to both sender/receiver
    const userSending = await User.findById(senderId);
    userSending.friends = [...userSending.friends, receiverId];
    const userReceiving = await User.findById(receiverId);

    // console.log(userSending, 'DD', userReceiving);
    userReceiving.friends = [...userReceiving.friends, senderId];

    await userSending.save();
    await userReceiving.save();

    // Delete Invitation
    await FriendInvitation.findByIdAndDelete(id);

    // Update list of friends if the user are online
    friendsUpdates.updateFriends(senderId.toString());
    friendsUpdates.updateFriends(receiverId.toString());

    // Update list of pending friend invitations
    friendsUpdates.updateFriendsPendingInvitations(receiverId.toString());

    return res.status(200).send('Friend successfully added');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went very wrong. Please try again');
  }
};

module.exports = postAccept;

/*    if (
      userSending.friends.find(f => f.id === receiverId) &&
      userReceiving.friends.find(f => f.id === senderId)
    ) {
      return res.status(404).send('ERRORRR aagyi bhai');
    } 
    */
