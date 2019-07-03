import React from 'react';
import PropTypes from 'prop-types';
import { app, chatListItem } from './app.config';
import ChatItem from './ChatItem';

export default function ChatScreen(props) {
  const { age, image, name } = props;

  return (
    <div style={{ ...app.style }}>
      <div style={{ ...chatListItem.style }}>
        <ChatItem user={{ age, image, name }} />
      </div>
      <div>Send</div>
    </div>
  );
}

ChatScreen.propTypes = {
  age: PropTypes.number.isRequired,
  image: PropTypes.shape({ alt: PropTypes.string, src: PropTypes.isRequired }).isRequired,
  name: PropTypes.string.isRequired,
};
