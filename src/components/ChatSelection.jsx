import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  app, chatList, chatListItem, request,
} from '../configs/app.config';
import ChatItem from './ChatItem';
import { errors, loading } from '../configs/app.text';

export default function ChatSelection(props) {
  const [users, updateSuggestions] = useState([]);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [networkFailed, setNetworkFailed] = useState(false);
  const { onItemClick } = props;

  useEffect(() => {
    axios
      .get(request.matches(1))
      .then((response) => {
        if (response.status < 300) {
          updateSuggestions(response.data);
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
        {errors.network}
      </div>
    );
  }

  if (loadFailed) {
    return (
      <div style={{ ...app.style }}>
        {errors.internal}
      </div>
    );
  }

  if (!isDataLoaded) {
    return (
      <div style={{ ...app.style }}>
        {loading}
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
