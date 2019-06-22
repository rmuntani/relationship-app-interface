import PropTypes from 'prop-types';
import React from 'react';
import ProfilePicture from './ProfilePicture';
import ProfileDescription from './ProfileDescription';

export default function Profile(props) {
  const { images, description } = props;

  return (
    <React.Fragment>
      <ProfilePicture {...{images: images}} />
      <ProfileDescription {...description} />
    </React.Fragment>
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
