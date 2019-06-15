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
    <img src={images[imageIndex]} onClick={() => updateIndex(imageIndex)} />
  );
}

ProfilePicture.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

ProfilePicture.defaultProps = {
  images: [],
};
