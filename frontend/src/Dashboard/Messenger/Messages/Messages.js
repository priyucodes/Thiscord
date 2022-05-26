import React, { useEffect, useRef } from 'react';
import { styled } from '@mui/system';
import MessagesHeader from './MessagesHeader';
import { connect } from 'react-redux';
// import DUMMY_MESSAGES from './DUMMY_MESSAGES';
import Message from './Message';
import DateSeperator from './DateSeperator';
const MainContainer = styled('div')({
  height: 'calc(100% - 3.75rem)', // - 3.75rem
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
const convertDateToReadable = (date, format) => {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched]);
};
const Messages = ({ chosenChatDetails, messages }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
    //{ behavior: 'smooth' }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <MainContainer>
      <MessagesHeader name={chosenChatDetails?.name} />
      {messages.map((message, index) => {
        const sameAuthor =
          index > 0 &&
          messages[index].author._id === messages[index - 1].author._id;

        const sameDay =
          index > 0 &&
          convertDateToReadable(new Date(message.date), 'dd/mm/yy') ===
            convertDateToReadable(
              new Date(messages[index - 1].date),
              'dd/mm/yy'
            );

        return (
          <div key={message._id} style={{ width: '97%' }}>
            {(!sameDay || index === 0) && (
              <DateSeperator
                date={convertDateToReadable(new Date(message.date), 'dd/mm/yy')}
              />
            )}
            <Message
              content={message.content}
              username={message.author.username}
              sameAuthor={sameAuthor}
              date={convertDateToReadable(new Date(message.date), 'dd/mm/yy')}
              sameDay={sameDay}
            />
          </div>
        );
      })}
      <div ref={messagesEndRef} style={{ marginTop: '20px' }} />
    </MainContainer>
  );
};
const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};
export default connect(mapStoreStateToProps)(Messages);
