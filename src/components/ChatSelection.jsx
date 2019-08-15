import React from 'react';
import PropTypes from 'prop-types';
import {
  app, chatList, chatListItem,
} from '../configs/app.config';
import ChatItem from './ChatItem';
import { loading } from '../configs/app.text';

export default function ChatSelection({
  error,
  selectUser, success,
  users,
}) {
  if (success === null) {
    return (
      <div style={{ ...app.style }}>
        {loading}
      </div>
    );
  }

  if (!success) {
    return (
      <div style={{ ...app.style }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ ...app.style }}>
      <ul style={{ ...chatList.style }}>
        {
        users.map(user => (
          <li
            key={user.id}
            onClick={() => selectUser(user.id)}
            style={{ ...chatListItem.style }}
          >
            <ChatItem user={user} />
          </li>
        ))
      }
      </ul>
    </div>
  );
}

ChatSelection.propTypes = {
  error: PropTypes.string.isRequired,
  selectUser: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
};

ChatSelection.defaultProps = {
  onItemClick: null,
  users: [],
};
