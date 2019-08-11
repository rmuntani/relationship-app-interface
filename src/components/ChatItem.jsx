import React from 'react';
import PropTypes from 'prop-types';
import Default from '../imgs/default.svg';
import {
  chatListUsername, chatPicture,
} from '../configs/app.config';

export default function ChatItem(props) {
  const { user } = props;

  /* eslint-disable no-param-reassign */
  const handleError = (event) => {
    event.target.onerror = null;
    event.target.src = Default;
  };
  /* eslint-enable no-param-reassign */

  return (
    <React.Fragment>
      <img
        alt={user.image.alt}
        onError={event => handleError(event)}
        src={user.image.src}
        style={{ ...chatPicture.style }}
      />
      <div style={{ ...chatListUsername.style }}>
        {`${user.name}, ${user.age}`}
      </div>
    </React.Fragment>
  );
}

ChatItem.propTypes = {
  user: PropTypes.shape({
    age: PropTypes.number.isRequired,
    image: PropTypes.shape({ alt: PropTypes.string, src: PropTypes.isRequired }).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
