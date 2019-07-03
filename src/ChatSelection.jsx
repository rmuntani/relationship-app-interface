import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  app, chatList, chatListItem, chatListUsername,
  chatPicture, request,
} from './app.config';
import Default from './imgs/default.svg';

export default function ChatSelection() {
  const [users, updateUsers] = useState([]);
  const [isDataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(request.matches(1))
      .then((response) => {
        if (response.status < 300) {
          updateUsers(response.data);
          setDataLoaded(true);
        }
      })
      .catch(() => {

      });
  }, []);

  /* eslint-disable no-param-reassign */
  const handleError = (event) => {
    event.target.onerror = null;
    event.target.src = Default;
  };
  /* eslint-enable no-param-reassign */

  if (!isDataLoaded) {
    return (<div>Loading...</div>);
  }

  return (
    <div style={{ ...app.style }}>
      <ul style={{ ...chatList.style }}>
        {
        users.map(user => (
          <li
            key={user.id}
            style={{ ...chatListItem.style }}
          >
            <img
              alt={user.image.alt}
              onError={event => handleError(event)}
              src={user.image.src}
              style={{ ...chatPicture.style}}
            />
            <div style={{ ...chatListUsername.style }}>
              {`${user.name}, ${user.age}`}
            </div>
          </li>
        ))
      }
      </ul>
    </div>
  );
}
