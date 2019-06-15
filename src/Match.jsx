import React from 'react';
import Button from './Button';
import Profile from './Profile';
import { buttons } from './app.config';

export default function Match() {
  const dislike = () => {};
  const like = () => {};
  const likeProperties = { click: like, keysDown: buttons.right };
  const dislikeProperties = { click: dislike, keysDown: buttons.left };

  return (
    <React.Fragment>
      <Profile />
      <Button {...dislikeProperties} />
      <Button {...likeProperties} />
    </React.Fragment>
  );
}
