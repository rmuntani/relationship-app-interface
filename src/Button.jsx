import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
  const { image, style } = props;
  const handleClick = () => {
    props.click();
  };

  console.log(style);

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
    <button
      data-testid="button"
      onClick={handleClick}
      onKeyDown={event => handleInteraction(event)}
      style={{...style}}
      tabIndex="0"
      type="button"
    >
      <img
        alt={image.alt}
        src={image.src}
      />
    </button>
  );
}

Button.propTypes = {
  click: PropTypes.func.isRequired,
  image: PropTypes.shape({ alt: PropTypes.string, src: PropTypes.isRequired }),
  keysDown: PropTypes.arrayOf(PropTypes.number),
};

Button.defaultProps = {
  image: { alt: 'No image found', src: null },
  keysDown: [],
};
