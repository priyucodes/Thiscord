import store from '../../store/store';
import { setMessages } from '../../store/actions/chatActions';

export const updateDirectChatHistoryIfActive = data => {
  const { participants, messages } = data;

  // FIND ID of token user, ID from active conversation

  const receiverId = store.getState().chat.chosenChatDetails?.id;
  const userId = store.getState().auth.userDetails._id;

  if (receiverId && userId) {
    const usersInConversation = [receiverId, userId];

    updateChatHistoryIfSameConversationActive({
      participants,
      usersInConversation,
      messages,
    });
  }
};

const updateChatHistoryIfSameConversationActive = ({
  participants,
  usersInConversation,
  messages,
}) => {
  const result = participants.every(function (participantId) {
    return usersInConversation.includes(participantId);
  });
  if (result) {
    // store object to change store state directly in files. NO need to connect actions to reducers..
    store.dispatch(setMessages(messages));
  }
};
