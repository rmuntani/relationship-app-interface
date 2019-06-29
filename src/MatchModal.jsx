import PropTypes from 'prop-types';
import React from 'react';
import {
  profilePicture, profilePictureImage, profileName,
} from './app.config';


export default function MatchModal(props) {
  const {
    age, click, name, image,
  } = props;
  const alt = () => ((image.alt) ? image.alt : name);

  return (
    <div onClick={() => click()} onKeyDown={() => click()} role="alert">
      <h1>{'It\'s a match!'}</h1>
      <div style={{ ...profilePicture.style }}>
        <img
          alt={alt()}
          src={image.src}
          style={{ ...profilePictureImage.style }}
        />
        <div style={{ ...profileName.style }}>{`${name}, ${age}`}</div>
      </div>
    </div>
  );
}

MatchModal.propTypes = {
  age: PropTypes.number.isRequired,
  click: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
  }).isRequired,
};
