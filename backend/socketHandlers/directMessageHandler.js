const Message = require('../models/messageModel');
const Conversation = require('../models/conversationModel');
const chatUpdates = require('./updates/chat');
const directMessageHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverUserId, content } = data;

    // Create New Message
    const message = await Message.create({
      content: content,
      author: userId,
      date: new Date(),
      type: 'DIRECT',
    });

    // Find if conversattion exist with this two users, if not create new
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
    });

    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();

      // Update to sender and receiver if is online
      chatUpdates.updateChatHistory(conversation._id.toString());
    } else {
      // Create new conversation
      const newConversation = await Conversation.create({
        messages: [message._id],
        participants: [userId, receiverUserId],
      });

      // Update to sender and receiver if is online
      chatUpdates.updateChatHistory(newConversation._id.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = directMessageHandler;
