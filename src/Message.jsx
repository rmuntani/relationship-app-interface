import React from 'react';
import PropTypes from 'prop-types';
import { CURRENT_USER, otherUserMessage, currentUserMessage } from './app.config';

export default function Message(props) {
  const { messages } = props;

  return (
    <ul>
      {messages.map((message) => {
        let messageStyle;
        if (message.id === CURRENT_USER) {
          messageStyle = currentUserMessage.message;
        } else {
          messageStyle = otherUserMessage.message;
        }

        return (
          <li style={messageStyle}>{message.text}</li>
        );
      })}
    </ul>
  );
}

Message.propTypes = {
  messages: PropTypes.shape(
    {
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    },
  ).isRequired,
};
