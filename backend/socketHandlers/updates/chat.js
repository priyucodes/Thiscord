const Conversation = require('../../models/conversationModel');
const serverStore = require('../../serverStore');

const updateChatHistory = async (
  conversationId,
  toSpecificiedSocketId = null
) => {
  const conversation = await Conversation.findById(conversationId).populate({
    path: 'messages',
    model: 'Message',
    // nested population
    populate: { path: 'author', model: 'User', select: 'username _id ' },
  });

  if (conversation) {
    const io = serverStore.getSocketServerInstance();

    if (toSpecificiedSocketId) {
      // Initial update of chat history
      return io.to(toSpecificiedSocketId).emit('direct-chat-history', {
        messages: conversation.messages,
        participants: conversation.participants,
      });
    }

    // Check if users of this conversation are online
    // If YES emit to them update of messages

    conversation.participants.forEach(userId => {
      const activeConnections = serverStore.getActiveConnections(
        userId.toString()
      );

      activeConnections.forEach(socketId => {
        io.to(socketId).emit('direct-chat-history', {
          messages: conversation.messages,
          participants: conversation.participants,
        });
      });
    });
  }
};

module.exports = {
  updateChatHistory,
};
