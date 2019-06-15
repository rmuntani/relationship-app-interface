import React from 'react';
import ProfilePicture from './ProfilePicture';
import ProfileDescription from './ProfileDescription';

export default function Profile(props) {

  return (
    <React.Fragment>
      <ProfilePicture image={'placeholder'} />
      <ProfileDescription />
    </React.Fragment>
  );
}
