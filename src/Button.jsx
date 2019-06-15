import React from 'react';
import PropTypes from 'prop-types';
import { buttons } from './app.config';

export default function Button(props) {
  const { image } = props;
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
    <img
      onClick={handleClick}
      onKeyDown={event => handleInteraction(event)}
      role="button"
      src={image}
      style={{ height: buttons.size, width: buttons.size }}
      tabIndex="0"
    />
  );
}

Button.propTypes = {
  click: PropTypes.func.isRequired,
  image: PropTypes.object,
  keysDown: PropTypes.arrayOf(PropTypes.number),
};

Button.defaultProps = {
  image: null,
  keysDown: [],
};
