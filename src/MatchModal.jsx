import PropTypes from 'prop-types';
import React from 'react';

export default function MatchModal(props) {
  const { name, picture } = props;

  return (
    <div>
      <h1>{'It\'s a match!'}</h1>
      <div>
        <h3>{name}</h3>
        <img src={picture} />
      </div>
    </div>
  );
}

MatchModal.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
};
