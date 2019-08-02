import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
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

export default function Profile(props) {
  const { images, description } = props;
  const { age, name } = description;
  const [showDescription, setShowDescription] = useState(false);
  const [imageIndex, nextImage] = useState(0);

  const handleClick = () => {
    if (!showDescription) setShowDescription(true);
    else {
      let nextImageIndex = imageIndex + 1;
      if (nextImageIndex >= images.length) nextImageIndex = 0;
      nextImage(nextImageIndex);
    }
  };

  const userDescription = () => {
    const { text } = description;
    return showDescription && (
      <div style={{ ...profileDescription.style }}>{text}</div>
    );
  };

  useEffect(() => {
    setShowDescription(false);
  }, [props]);

  return (
    <div style={{ ...profile.style }}>
      <button
        onClick={() => handleClick()}
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
