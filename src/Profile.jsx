import React from 'react';
import ProfilePicture from './ProfilePicture';
import ProfileDescription from './ProfileDescription';

export default function Profile(props) {
  const { images, description } = props;

  return (
    <React.Fragment>
      <ProfilePicture {...{ images: images }} />
      <ProfileDescription {...description} />
    </React.Fragment>
  );
}
