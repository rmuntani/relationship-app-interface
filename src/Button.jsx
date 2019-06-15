import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
  const handleClick = () => {
    props.click();
  };

  const handleInteraction = (event) => {
    const { keysDown } = props;
    const hasKeyCode = keysDown.reduce(
      (accumulator, currentKey) => accumulator || currentKey === event.keyCode, false,
    );

    if (hasKeyCode) {
      props.click();
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyPress={event => handleInteraction(event)}
      role="button"
      tabIndex="0"
    />
  );
}

Button.propTypes = {
  click: PropTypes.func.isRequired,
  keysDown: PropTypes.arrayOf(PropTypes.string).isRequired,
};
