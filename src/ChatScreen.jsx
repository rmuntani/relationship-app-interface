import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { app, chatListItem, CURRENT_USER } from './app.config';
import ChatItem from './ChatItem';
import Message from './Message';
import { sendMessageToUser, chatConnection } from './chatClient';

export default function ChatScreen(props) {
  const {
    age, id, image, name,
  } = props;
  const [message, updateMessage] = useState('');
  const [messageHistory, updateMessageHistory] = useState([]);

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
    const { data } = newMessage;
    const receivedMessage = { user: id, text: data };
    updateMessageHistory([...messageHistory, receivedMessage]);
  };

  useEffect(() => {
    const handleEvents = {
      onClose: () => {},
      onMessage,
    };
    chatConnection(handleEvents);
  }, []);

  return (
    <div style={{ ...app.style }}>
      <div style={{ ...chatListItem.style }}>
        <ChatItem user={{ age, image, name }} />
      </div>
      <div>
        <input
          onChange={event => handleChange(event)}
          type="text"
          value={message}
        />
        <Message messages={messageHistory} />
        <button type="button" onClick={() => sendMessage()}>Send</button>
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
