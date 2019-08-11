import PropTypes from 'prop-types';
import React from 'react';
import {
  profilePicture, profilePictureImage, profileName,
} from '../configs/app.config';
import { matchText } from '../configs/app.text';


export default function MatchModal({
  closeModal, user,
}) {
  const {
    age, name, image,
  } = user;
  const alt = () => ((image.alt) ? image.alt : name);

  return (
    <div onClick={() => closeModal()} onKeyDown={() => closeModal()} role="alert">
      <h1>{matchText}</h1>
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
  closeModal: PropTypes.func,
  user: PropTypes.shape({
    age: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.shape({
      alt: PropTypes.string,
      src: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

MatchModal.defaultProps = {
  closeModal: null,
};
