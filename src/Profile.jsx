import React from 'react';
import ProfilePicture from './ProfilePicture';
import ProfileDescription from './ProfileDescription';

export default function Profile() {
  const images = { images: ['placeholder'] };

  return (
    <React.Fragment>
      <ProfilePicture {...images} />
      <ProfileDescription />
    </React.Fragment>
  );
}
