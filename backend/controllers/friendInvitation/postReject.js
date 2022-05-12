const FriendInvitation = require('../../models/friendInvitationModel');
const friendsUpdates = require('../../socketHandlers/updates/friends');
const postReject = async (req, res) => {
  console.log('ss');
  try {
    const { id } = req.body;
    const { userId } = req.user;
    console.log(req.user, req.body);

    // Remove Invitation
    const invitationExists = await FriendInvitation.exists({ _id: id });

    if (invitationExists) {
      await FriendInvitation.findByIdAndDelete(id);
    }

    // Update Pending Invitations
    friendsUpdates.updateFriendsPendingInvitations(userId);

    return res.status(200).send('Invitation successfully rejected');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went very wrong! Please try again!');
  }
};

module.exports = postReject;
