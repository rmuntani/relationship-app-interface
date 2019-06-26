import PropTypes from 'prop-types';
import React from 'react';

export default function MatchModal(props) {
  const { click, name, image } = props;

  const handleClick = () => {
    click();
  };

  const alt = () => ((image.alt) ? image.alt : name);

  return (
    <div onClick={handleClick} onKeyDown={handleClick} role="alert">
      <h1>{'It\'s a match!'}</h1>
      <div>
        <h3>{name}</h3>
        <img alt={alt()} src={image.src} />
      </div>
    </div>
  );
}

MatchModal.propTypes = {
  click: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
  }).isRequired,
};
