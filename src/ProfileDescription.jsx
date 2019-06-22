import PropTypes from 'prop-types';
import React from 'react';

export default function ProfileDescription(props) {
  const { name, text } = props;

  return (
    <div>
      <h1>{name}</h1>
      <div>{text}</div>
    </div>
  );
}

ProfileDescription.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
