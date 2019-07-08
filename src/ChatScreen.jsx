import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  app, chatListItem, CURRENT_USER, messageInput, messageScreen, messageScreenInputs, messageButton,
} from './app.config';
import ChatItem from './ChatItem';
import Message from './Message';
import { sendMessageToUser, chatConnection } from './chatClient';

export default function ChatScreen(props) {
  const {
    age, id, image, name,
  } = props;
  const [message, updateMessage] = useState('');
  const [messageHistory, updateMessageHistory] = useState([]);
  const [lastReceivedMessage, updateReceivedMessage] = useState({});

  const handleChange = (event) => {
    updateMessage(event.target.value);
  };

  const sendMessage = () => {
    const sentMessage = { user: CURRENT_USER, text: message };
    sendMessageToUser(message, id);
    updateMessage('');
    updateMessageHistory([...messageHistory, sentMessage]);
  };

  const onMessage = (newMessage) => {
    const receivedMessage = JSON.parse(newMessage.data);
    updateReceivedMessage(receivedMessage);
  };

  useEffect(() => {
    const handleEvents = {
      onClose: null,
      onMessage,
    };
    chatConnection(handleEvents);
  }, []);

  const isReceivedMessageValid = validateMessage => validateMessage.id !== undefined
           && validateMessage.text !== undefined;

  useEffect(() => {
    if (isReceivedMessageValid(lastReceivedMessage)) {
      updateMessageHistory([...messageHistory, lastReceivedMessage]);
    }
  }, [lastReceivedMessage]);

  return (
    <div style={{ ...app.style }}>
      <div style={{ ...chatListItem.style }}>
        <ChatItem user={{ age, image, name }} />
      </div>
      <div style={{ ...messageScreen.style }}>
        <Message messages={messageHistory} />
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
  age: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.shape({ alt: PropTypes.string, src: PropTypes.isRequired }).isRequired,
  name: PropTypes.string.isRequired,
};
