import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import posed from 'react-pose';
import {
  profile, profilePicture, profilePictureImage, profileDescription,
} from './app.config';

const Image = posed.img({
  normal: {
    height: '400px',
  },
  reduced: {
    height: '300px',
  },
});

export default function Profile(props) {
  const { images, description } = props;
  const { age, name } = description;
  const [showDescription, setShowDescription] = useState(false);

  const openDescription = () => {
    setShowDescription(true);
  };

  const userDescription = () => {
    const { text } = description;
    return showDescription && (
      <div>{text}</div>
    );
  };

  useEffect(() => {
    setShowDescription(false);
  }, [props]);

  return (
    <div style={{ ...profile.style }}>
      <button
        onClick={() => openDescription()}
        style={{ ...profilePicture.style }}
        type="button"
      >
        <Image
          alt={images[0].alt}
          pose={showDescription ? 'reduced' : 'normal'}
          src={images[0].src}
          style={{ ...profilePictureImage.style }}
        />
        <div style={{ ...profileDescription.style }}>{`${name}, ${age}`}</div>
      </button>
      {userDescription()}
    </div>
  );
}

Profile.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      alt: PropTypes.string.isRequired,
      src: PropTypes.isRequired,
    }),
  ).isRequired,
  description: PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};
