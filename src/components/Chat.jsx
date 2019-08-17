import PropTypes from 'prop-types';
import React from 'react';
import ChatSelection from '../containers/ChatSelection';
import ChatScreen from './ChatScreen';

export default function Chat({ chatWith }) {
  if (chatWith !== null) {
    return (<ChatScreen {...chatWith} />);
  }

  return (<ChatSelection />);
}

Chat.propTypes = {
  chatWith: PropTypes.number,
};

Chat.defaultProps = {
  chatWith: null,
};
