import PropTypes from 'prop-types';
import React from 'react';

export default function ProfileDescription(props) {
  const { age, name, text } = props;

  return (
    <div>
      <h1>{name}</h1>
      <h1>{age}</h1>
      <div>{text}</div>
    </div>
  );
}

ProfileDescription.propTypes = {
  age: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
