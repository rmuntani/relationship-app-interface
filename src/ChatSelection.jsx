import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  app, chatList, chatListItem, request,
} from './app.config';
import ChatItem from './ChatItem';

export default function ChatSelection(props) {
  const [users, updateUsers] = useState([]);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [networkFailed, setNetworkFailed] = useState(false);
  const { onItemClick } = props;

  useEffect(() => {
    axios
      .get(request.matches(1))
      .then((response) => {
        if (response.status < 300) {
          updateUsers(response.data);
          setDataLoaded(true);
        } else {
          setLoadFailed(true);
        }
      })
      .catch(() => {
        setNetworkFailed(true);
      });
  }, []);

  if (networkFailed) {
    return (
      <div style={{ ...app.style }}>
        Network problems detected. Please try again latter.
      </div>
    );
  }

  if (loadFailed) {
    return (
      <div style={{ ...app.style }}>
        We're experimenting technical difficulties. Please try again latter.
      </div>
    );
  }

  if (!isDataLoaded) {
    return (
      <div style={{ ...app.style }}>
        Loading...
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
            onClick={() => onItemClick(user)}
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
  onItemClick: PropTypes.func,
};

ChatSelection.defaultProps = {
  onItemClick: null,
};
