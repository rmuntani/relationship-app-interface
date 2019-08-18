import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  app, chatListItem, CURRENT_USER, messageInput,
  messageScreen, messageScreenInputs, messageButton,
} from '../configs/app.config';
import ChatItem from './ChatItem';
import Message from './Message';
import { chatConnection } from '../chatClient';

export default function ChatScreen({
  messages, receiveMessage,
  sendMessageToUser, user,
}) {
  const {
    age, id, image, name,
  } = user;
  const [message, updateMessage] = useState('');

  const handleChange = (event) => {
    updateMessage(event.target.value);
  };

  const emptyMessage = () => updateMessage('');

  const sendMessage = () => {
    const sentMessage = { id: CURRENT_USER, message };
    sendMessageToUser(id, sentMessage);
    emptyMessage();
  };

  const onMessage = (newMessage) => {
    const receivedMessage = JSON.parse(newMessage.data);
    receiveMessage(receivedMessage.id, receivedMessage);
  };

  useEffect(() => {
    const handleEvents = {
      onClose: null,
      onMessage,
    };
    chatConnection(handleEvents);
  }, []);

  return (
    <div style={{ ...app.style }}>
      <div style={{ ...chatListItem.style }}>
        <ChatItem user={{ age, image, name }} />
      </div>
      <div style={{ ...messageScreen.style }}>
        <Message messages={messages} />
        <div style={{ ...messageScreenInputs.style }}>
          <input
            onChange={event => handleChange(event)}
            type="text"
            value={message}
            style={{ ...messageInput.style }}
          />
          <button
            onClick={() => sendMessage()}
            style={{ ...messageButton.style }}
            type="button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

ChatScreen.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
    }),
  ),
  receiveMessage: PropTypes.func.isRequired,
  sendMessageToUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    age: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.shape({ alt: PropTypes.string, src: PropTypes.isRequired }).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

ChatScreen.defaultProps = {
  messages: [],
};
