const FriendInvitation = require('../../models/friendInvitationModel');
const { remove } = require('../../models/userModel');
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

    const currentUser = await User.findById(req.user.userId);
    console.log(currentUser.friends);
    console.log('Sending ID', senderId.toString());
    console.log('receiver ID', receiverId.toString());
    const removeId = currentUser.friends.filter(fid => {
      if (
        fid.toString() === senderId.toString() ||
        fid.toString() === receiverId.toString()
      ) {
        return fid;
      }
    });

    if (removeId.length >= 1)
      return res
        .status(404)
        .end('User Already added! Please reject the friend request! ');
    // Add Friend to both sender/receiver
    const userSending = await User.findById(senderId);
    userSending.friends = [...userSending.friends, receiverId];
    const userReceiving = await User.findById(receiverId);

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
    friendsUpdates.updateFriendsPendingInvitations(senderId.toString());
    return res.status(200).send('Friend successfully added');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went very wrong. Please try again');
  }
};

module.exports = postAccept;

/*    
     if (
      pendingInvitations.forEach(f => {
        f.senderId.toString() === senderId.toString() &&
        f.receiverId.toString() === receiverId.toString()
          ? ''
          : [];
      })
    );

        if (
      userSending.friends.find(f => {
        console.log(f === receiverId);
        return f === receiverId;
      }) &&
      userReceiving.friends.find(f => f === senderId)
    ) {
      return res.status(404).send('ERRORRR aagyi bhai');
    }

    */
