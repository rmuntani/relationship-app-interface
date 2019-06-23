import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';

const ClickBox = posed.button({
  pressable: true,
  init: { scale: 1 },
  press: { scale: 0.8 },
});

export default function Button(props) {
  const { image, style } = props;
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
    <ClickBox
      onClick={handleClick}
      onKeyDown={event => handleInteraction(event)}
      style={{...style}}
      tabIndex="0"
      type="button"
    >
      <img
        alt={image.alt}
        src={image.src}
        style={{...style}}
      />
    </ClickBox>
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
