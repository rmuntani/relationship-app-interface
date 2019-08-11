import PropTypes from 'prop-types';
import React from 'react';
import posed from 'react-pose';
import {
  profile, profilePicture, profilePictureImage, profileDescription, profileName,
} from '../configs/app.config';

const Image = posed.img({
  normal: {
    height: '400px',
  },
  reduced: {
    height: '300px',
  },
});

export default function Profile({
  description,
  imageClick,
  imageIndex,
  images,
  showDescription,
}) {
  const { age, name } = description;

  const userDescription = () => {
    const { text } = description;
    return showDescription && (
      <div style={{ ...profileDescription.style }}>{text}</div>
    );
  };

  return (
    <div style={{ ...profile.style }}>
      <button
        onClick={() => imageClick(showDescription, imageIndex, images.length)}
        style={{ ...profilePicture.style }}
        type="button"
      >
        <Image
          alt={images[imageIndex].alt}
          pose={showDescription ? 'reduced' : 'normal'}
          src={images[imageIndex].src}
          style={{ ...profilePictureImage.style }}
        />
        <div style={{ ...profileName.style }}>{`${name}, ${age}`}</div>
      </button>
      {userDescription()}
    </div>
  );
}

Profile.propTypes = {
  description: PropTypes.shape({
    age: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  imageClick: PropTypes.func.isRequired,
  imageIndex: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.shape({
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  })).isRequired,
  showDescription: PropTypes.bool.isRequired,
};

Profile.defaultProps = {
  imageIndex: 0,
};
