import React from 'react';

export default function ProfilePicture(props) {
  const { image } = props.image;

  return (
    <img src={image}/>
  );
}
