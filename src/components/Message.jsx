import React from 'react';
import PropTypes from 'prop-types';
import {
  CURRENT_USER, otherUserMessage, currentUserMessage, messageList,
} from '../configs/app.config';

export default function Message(props) {
  const { messages } = props;

  return (
    <ul style={{ ...messageList.style }}>
      {messages.map((message, index) => {
        let messageStyle;
        if (message.id === CURRENT_USER) {
          messageStyle = currentUserMessage.style;
        } else {
          messageStyle = otherUserMessage.style;
        }

        return (
          <li
            key={index}
            style={messageStyle}
          >
            {message.message}
          </li>
        );
      })}
    </ul>
  );
}

Message.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.number,
        text: PropTypes.string,
      },
    ),
  ),
};

Message.defaultProps = {
  messages: [],
};
