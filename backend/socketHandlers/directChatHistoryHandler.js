const Conversation = require('../models/conversationModel');
const chatUpdates = require('./updates/chat');

const directChatHistoryHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverUserId } = data;

    const conversation = await Conversation.find({
      participants: { $all: [userId, receiverUserId] },
      type: 'DIRECT',
    });
    if (conversation) {
      const conversationFix = conversation[0]?._id.toString() || false;
      if (!conversationFix) {
        throw 'Conversation ID not found';
      }
      chatUpdates.updateChatHistory(conversation[0]._id.toString(), socket.id);
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = directChatHistoryHandler;
