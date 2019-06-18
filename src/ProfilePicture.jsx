import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ProfilePicture(props) {
  const { images } = props;
  const [imageIndex, changeImage] = useState(0);

  const updateIndex = (currIndex) => {
    let newIndex = currIndex + 1;
    if (images.length === newIndex) newIndex = 0;
    changeImage(newIndex);
  };

  return (
    <button onClick={() => updateIndex(imageIndex)} type="button">
      <img
        alt={images[imageIndex].alt}
        src={images[imageIndex].src}
      />
    </button>
  );
}

ProfilePicture.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      alt: PropTypes.string,
      src: PropTypes.isRequired,
    }) 
  ),
};

ProfilePicture.defaultProps = {
  images: [],
};
